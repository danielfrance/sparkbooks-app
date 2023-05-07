<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdStripePlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // TODO: this should pull directly from stripe instead of being hardcoded.


        'https://app.sparkbooks.io/dashboard';
        $plans = [
            [
                'name' => "Starter",
                'description' => "A Starter plan for freelancers or small businesses",
                'stripe_id' => "prod_NqbHgavgrLKayv",
                'monthly_payment_link' => "https://buy.stripe.com/test_aEUbKN8ba7n39m89AA",
                'monthly_price' => "25.00",
                'annual_price' => "299.00",
                'annual_payment_link' => "https://buy.stripe.com/test_28o4il9fe5eVbugdQR",
                'seats' => "1",
                'clients' => "1",
                'pages' => "100",
                'vault_access' => false,
                'reports_access' => false,
                'integrations_access' => false,
                'support_access' => false,
            ],
            [
                'name' => "Basic",
                'description' => "Our Basic plan. Perfect for small businesses with several clients",
                'stripe_id' => "prod_NqbIUDKtgOX8Y5",
                'monthly_payment_link' => "https://buy.stripe.com/test_00g4il7767n32XK4gi",
                'monthly_price' => "299.00",
                'annual_price' => "2,388.00",
                'annual_payment_link' => "https://buy.stripe.com/test_4gwbKN8ba36Naqc28b",
                'seats' => "2",
                'clients' => "10",
                'pages' => "1000",
                'vault_access' => true,
                'reports_access' => true,
                'integrations_access' => true,
                'support_access' => false,
            ],
            [
                'name' => "Standard",
                'description' => "The Standard plan is perfect for small to medium businesses with several clients",
                'stripe_id' => "prod_NqbJklgL3X8pnR",
                'monthly_payment_link' => "https://buy.stripe.com/test_14kg131MMgXDeGs5ko",
                'monthly_price' => "499.00",
                'annual_price' => "4,788.00",
                'annual_payment_link' => "https://buy.stripe.com/test_00g0259fegXD8i49AF",
                'seats' => '2',
                'clients' => '30',
                'pages' => '2500',
                'vault_access' => true,
                'reports_access' => true,
                'integrations_access' => true,
                'support_access' => false,
            ],
            [
                'name' => "Premium",
                'description' => "For businesses with several clients and a large number of monthly receipts",
                'stripe_id' => "prod_NqbKEOtmqxpuxT",
                'monthly_payment_link' => "https://buy.stripe.com/test_3cs6qt8ba36NdCo14a",
                'monthly_price' => "899.00",
                'annual_price' => "8988.00",
                'annual_payment_link' => "https://buy.stripe.com/test_bIYaGJ9fe5eV55SeV1",
                'seats' => 5,
                'clients' => "unlimited",
                'pages' => "5000",
                'vault_access' => true,
                'reports_access' => true,
                'integrations_access' => true,
                'support_access' => true,
            ],
            [
                'name' => "Enterprise",
                'description' => "A custom plan for businesses with more than 5000 monthly receipts",
                'stripe_id' => null,
                'monthly_payment_link' => null,
                'monthly_price' => null,
                'annual_price' => null,
                'annual_payment_link' => null,
                'seats' => null,
                'clients' => null,
                'pages' => null,
                'vault_access' => true,
                'reports_access' => true,
                'integrations_access' => true,
                'support_access' => true,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
