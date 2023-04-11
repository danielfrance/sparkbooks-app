<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Webhook;
use Stripe\Customer;
use Stripe\Subscription;
use Stripe\Product;

class StripeController extends Controller
{
    public function handleWebhook(Request $request)
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
        if ($event->type == 'charge.succeeded') {
            try {
                Log::info('charge.succeeded');
                $session = $event->data->object;

                // Get the customer ID
                $customerId = $session->customer;

                // Retrieve the customer object
                $customer = Customer::retrieve($customerId);

                // Get the customer's email
                $customerEmail = $customer->email;

                // Retrieve the customer's subscriptions
                $subscriptions = Subscription::all(['customer' => $customerId]);

                // Get the subscription ID
                $subscriptionId = $subscriptions->data[0]->id;

                $subscriptionPlan = Product::retrieve($subscriptions->data[0]->items->data[0]->plan->product);

                // Get the subscription ID
                $subscriptionId = $subscriptions->data[0]->id;

                // Find the user by email
                $workspace = Workspace::where('email', $customerEmail)->first();

                $items = $subscriptions->data[0]->items->data;
                $seatQuantity = (count($items) > 1) ? $items[1]->quantity : 0;

                Log::info('computing workspace details');

                $workspaceDetails = $this->computeWorkSpaceDetails($subscriptionPlan->name, $seatQuantity, $subscriptionId);



                if ($workspace) {
                    // Save the workspace's subscription in the database
                    Log::info('saving workspace subscription');
                    $workspace->subscriptions()->create([
                        'name' => $subscriptionPlan->name,
                        'workspace_id' => $workspace->id,
                        'stripe_id' => $subscriptionId,
                        'stripe_status' => $subscriptions->data[0]->status,
                        'stripe_price' => $subscriptions->data[0]->items->data[0]->price->unit_amount,
                        'quantity' => 1,
                    ]);

                    Log::info('updating workspace details');

                    $workspace->update([
                        'stripe_id' => $subscriptionId,
                        'pm_type' => $session->payment_method_details->type,
                        'pm_last_four' => $session->payment_method_details->card->last4,
                    ]);

                    Log::info('creating workspace subscription details');

                    $workspace->subscriptionDetails()->create($workspaceDetails);
                    // You can update the user's role or any other attributes if necessary
                }
            } catch (\Throwable $th) {
                throw $th;
            }
        }

        return response('Webhook received', 200);
    }

    public function test()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Retrieve the customer object
        $customer = Customer::retrieve('cus_Nh7bqWfbBbxDBZ');

        // Get the customer's email
        $customerEmail = $customer->email;

        // Retrieve the customer's subscriptions
        $subscriptions = Subscription::all(['customer' => 'cus_Nh7bqWfbBbxDBZ']);


        $subscriptionPlan = Product::retrieve($subscriptions->data[0]->items->data[0]->plan->product);

        // Get the subscription ID
        $subscriptionId = $subscriptions->data[0]->id;


        $workspace = Workspace::where('email', $customerEmail)->first();

        $items = $subscriptions->data[0]->items->data;
        $seatQuantity = (count($items) > 1) ? $items[1]->quantity : 0;

        $workspaceDetails = $this->computeWorkSpaceDetails($subscriptionPlan->name, $seatQuantity, $subscriptionId);



        if ($workspace) {
            // Save the workspace's subscription in the database
            $workspace->subscriptions()->create([
                'name' => $subscriptionPlan->name,
                'workspace_id' => $workspace->id,
                'stripe_id' => $subscriptionId,
                'stripe_status' => $subscriptions->data[0]->status,
                'stripe_price' => $subscriptions->data[0]->items->data[0]->price->unit_amount,
                'quantity' => 1,
            ]);

            // $workspace->update([
            //     'stripe_id' => $subscriptionId,
            //     'pm_type' => $session->data[0]->payment_method_details->type,
            //     'pm_last_four' => $session->data[0]->payment_method_details->card->last4,
            // ]);


            $workspace->subscriptionDetails()->create($workspaceDetails);



            // You can update the user's role or any other attributes if necessary
        }
    }

    public function computeWorkSpaceDetails($planName, $additionalSeats, $subscriptionId)
    {
        switch ($planName) {
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
