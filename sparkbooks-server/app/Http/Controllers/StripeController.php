<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\SubscriptionDetails;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\Charge;
use Stripe\Stripe;
use Stripe\Webhook;
use Stripe\Customer;
use Stripe\PaymentIntent;
use Stripe\Subscription;
use Stripe\Product;
use Spatie\SlackAlerts\Facades\SlackAlert;


class StripeController extends Controller
{

    public function test()
    {

    }
    public function handleSubscription(Request $request)
    {
        Log::info('handleWebhook');
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $payload = $request->getContent();
        $sig_header = $request->header('stripe-signature');
        $event = null;

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                env('STRIPE_WEBHOOK_SECRET')
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            Log::info('Invalid payload');
            return response()->json(['message' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            Log::info('Invalid signature');
            return response()->json(['message' => 'Invalid signature'], 400);
        }

        Log::info('passed validation');
        // Handle the event


        if ($event->type == 'invoice.payment_succeeded' && $event->data->object->billing_reason == 'subscription_create') {
            try {
                Log::info('charge.succeeded');
                $session = $event->data->object;

                // Get the customer ID
                $customerId = $session->customer;

                // Retrieve the customer object
                $customer = Customer::retrieve($customerId);

                // Get the customer's email
                $customerEmail = $customer->email;

                // Get the subscription ID
                $subscription = Subscription::retrieve($session->subscription);

                $subscriptionPlan = Product::retrieve($session->lines->data[0]->plan->product);

                $charge = Charge::retrieve($session->charge);

                // Find the user by email
                $workspace = Workspace::where('email', $customerEmail)->first();

                $items = $session->lines->data;
                $seatQuantity = (count($items) > 1) ? $items[1]->quantity : 0;

                Log::info('computing workspace details');

                $workspaceDetails = $this->computeWorkSpaceDetails($subscriptionPlan->name, $seatQuantity, $subscription->id);

                Log::info("plan name: " . $subscriptionPlan->name);


                if ($workspace) {
                    // Save the workspace's subscription in the database
                    Log::info('saving workspace subscription');
                    $workspace->subscriptions()->create([
                        'name' => $subscriptionPlan->name,
                        'workspace_id' => $workspace->id,
                        'stripe_id' => $subscription->id,
                        'stripe_status' => $subscription->status,
                        'stripe_price' => $subscription->items->data[0]->price->unit_amount,
                        'quantity' => 1,
                    ]);

                    Log::info('updating workspace details');

                    $workspace->update([
                        'stripe_id' => $customerId,
                        'pm_type' => $charge->payment_method_details->type,
                        'pm_last_four' => $charge->payment_method_details->card->last4,
                        'remaining_monthly_pages' => $workspaceDetails['pages']
                    ]);

                    Log::info('creating workspace subscription details');

                    $workspace->subscriptionDetails()->create($workspaceDetails);


                    return ['message' => 'Workspace subscription created'];

                    // You can update the user's role or any other attributes if necessary
                }
            } catch (\Throwable $th) {
                // return ['message' => 'Error creating workspace subscription', 'error' => $th->getMessage()];
                Log::error($th);
            }
        }
        if ($event->type == 'invoice.payment_succeeded' && $event->data->object->billing_reason == 'subscription_cycle') {
            $this->handleRenewalSuccess($event);
        }
        if ($event->type == 'customer.subscription.updated') {
            $this->handleSubscriptionUpdated($event);
        }

        return response('Webhook received', 200);
    }

    public function handleRenewalFailure(Request $request)
    {
        Log::info('handleRenewalFailure');
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $event = \Stripe\Event::constructFrom(
            $request->all()
        );

        // Get the customer ID from the event data
        $customerId = $event->data->object->customer;

        // Retrieve the user associated with the customer ID
        $workspace = Workspace::where('stripe_id', $customerId)->first();

        SlackAlert::message('Subscription renewal failed for ' . $workspace->name . ' - ' . $workspace->email . ' - ' . $workspace->stripe_id . ' - ' . $workspace->pm_last_four . ' - ' . $workspace->pm_type . ' - ' . $workspace->remaining_monthly_pages . ' pages remaining');

    }

    public function handleRenewalSuccess($event)
    {
        Log::info('handleRenewalSuccess');
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {

            Log::info('charge.succeeded');
            $session = $event->data->object;

            // Get the customer ID
            $customerId = $session->customer;

            // Retrieve the customer object
            $customer = Customer::retrieve($customerId);

            // Get the customer's email
            $customerEmail = $customer->email;

            // Get the subscription ID
            $subscription = Subscription::retrieve($session->subscription);

            $subscriptionPlan = Product::retrieve($session->lines->data[0]->plan->product);

            $charge = Charge::retrieve($session->charge);

            // Find the user by email
            $workspace = Workspace::where('email', $customerEmail)->first();

            $items = $session->lines->data;
            $seatQuantity = (count($items) > 1) ? $items[1]->quantity : 0;


            $workspaceDetails = $this->computeWorkSpaceDetails($subscriptionPlan->name, $seatQuantity, $subscription->id);

            if ($workspace) {
                // Save the workspace's subscription in the database
                Log::info('saving workspace subscription');
                $workspace->subscriptions()->update([
                    'stripe_status' => $subscription->status,
                    'stripe_price' => $subscription->items->data[0]->price->unit_amount,
                    'quantity' => 1,
                ]);

                Log::info('updating workspace details');

                $workspace->update([
                    'remaining_monthly_pages' => $workspaceDetails['pages']
                ]);

                Log::info('creating workspace subscription details');

                $workspace->subscriptionDetails()->update($workspaceDetails);

                return ['message' => 'Workspace subscription updated'];

                // You can update the user's role or any other attributes if necessary
            }
        } catch (\Throwable $th) {
            // return ['message' => 'Error creating workspace subscription', 'error' => $th->getMessage()];
            Log::error($th);
        }



        return ["event" => $event, "hook" => "handleRenewalSuccess"];
    }

    public function handleSubscriptionDeleted(Request $request)
    {
        Log::info('handleRenewalFailure');
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $event = \Stripe\Event::constructFrom(
            $request->all()
        );

        if ($event->type === 'customer.subscription.deleted') {
            // Get the customer ID and subscription ID from the event data
            $customerId = $event->data->object->customer;
            $subscriptionId = $event->data->object->id;

            // Retrieve the user associated with the customer ID
            $workspace = Workspace::where('stripe_id', $subscriptionId)->first();

            if ($workspace) {
                // Handle the subscription cancellation, e.g., remove the subscription from the user, block access to resources, etc.
                $workspace->subscriptions()->where('stripe_id', $subscriptionId)->update(['stripe_status' => 'canceled']);

                $workspace->update([
                    'stripe_id' => null,
                    'pm_type' => null,
                    'pm_last_four' => null,
                    'remaining_monthly_pages' => 0
                ]);

                $workspace->subscriptionDetails()->delete();

                // TODO: Send email to user

            }
            SlackAlert::message('Subscription cancelled for ' . $workspace->name . ' - ' . $workspace->email . ' - ' . $workspace->stripe_id);
        }

        return response('Webhook Handled', 200);
    }

    public function handleSubscriptionUpdated($event)
    {
        $session = $event->data->object;

        // Get the customer ID
        $customerId = $session->customer;

        // Retrieve the customer object
        $customer = Customer::retrieve($customerId);

        // Get the customer's email
        $customerEmail = $customer->email;

        // Get the subscription ID
        $subscription = Subscription::retrieve($session->id);

        $subscriptionPlan = Product::retrieve($session->plan->product);

        // Find the user by email
        $workspace = Workspace::where('email', $customerEmail)->first();

        Log::info('computing workspace details');

        $workspaceDetails = $this->computeWorkSpaceDetails($subscriptionPlan->name, 0, $subscription->id);

        $prevPlan = Plan::where('stripe_id', $event->data->previous_attributes->plan->product)->get()->first();

        if ($workspace) {
            // Save the workspace's subscription in the database
            Log::info('saving workspace updated subscription');
            $workspace->subscriptions()->update([
                'name' => $subscriptionPlan->name,
                'stripe_status' => $subscription->status,
                'stripe_price' => $session->plan->amount,
                'quantity' => 1,
            ]);

            Log::info('updating workspace details');

            $workspace->update([
                'remaining_monthly_pages' => $workspaceDetails['pages'] + $workspace->remaining_monthly_pages
            ]);

            Log::info('creating workspace subscription details');

            $workspace->subscriptionDetails()->update($workspaceDetails);

            return ['message' => 'Workspace subscription updated'];

            // You can update the user's role or any other attributes if necessary
        }

    }

    public function computeWorkSpaceDetails($planName, $additionalSeats, $subscriptionId)
    {
        //TODO: delete test renewal
        switch ($planName) {
            case 'test renewal':
                return [
                    "stripe_id" => $subscriptionId,
                    "seats" => 1 + $additionalSeats,
                    "pages" => 5,
                    "clients" => 1,
                    "vault_access" => false,
                    "reports_access" => false,
                    "integrations_access" => false,
                    "support_access" => false,
                ];
                break;

            case 'Starter':
                return [
                    "stripe_id" => $subscriptionId,
                    "seats" => 1 + $additionalSeats,
                    "pages" => 100,
                    "clients" => 1,
                    "vault_access" => false,
                    "reports_access" => false,
                    "integrations_access" => false,
                    "support_access" => false,
                ];
                break;

            case 'Basic':
                return [
                    "stripe_id" => $subscriptionId,
                    "seats" => 1 + $additionalSeats,
                    "pages" => 1000,
                    "clients" => 10,
                    "vault_access" => true,
                    "reports_access" => true,
                    "integrations_access" => true,
                    "support_access" => true,
                ];
                break;

            case 'Standard':
                return [
                    "stripe_id" => $subscriptionId,
                    "seats" => 2 + $additionalSeats,
                    "pages" => 2500,
                    "clients" => 30,
                    "vault_access" => true,
                    "reports_access" => true,
                    "integrations_access" => true,
                    "support_access" => true,
                ];
                break;

            case 'Premium':
                return [
                    "stripe_id" => $subscriptionId,
                    "seats" => 5 + $additionalSeats,
                    "pages" => 5000,
                    "clients" => 0,
                    "vault_access" => true,
                    "reports_access" => true,
                    "integrations_access" => true,
                    "support_access" => true,
                ];
                break;
            default:
                break;
        }
    }
}
