<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DevStripePlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = [
            [
                'name' => "Starter",
                'description' => "A Starter plan for freelancers or small businesses",
                'stripe_id' => "prod_NkAkFvPbVo1j0B",
                'monthly_payment_link' => "https://buy.stripe.com/test_4gwdSi6KM4ht4xObIV",
                'monthly_price' => "24.99",
                'annual_price' => "299.99",
                'annual_payment_link' => "https://buy.stripe.com/test_dR6eWmb127tFc0gcN0",
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
                'stripe_id' => "prod_NgqjJwCHFHb3h7",
                'monthly_payment_link' => "https://buy.stripe.com/test_00g15wd9a6pB0hy004",
                'monthly_price' => "299.00",
                'annual_price' => "2,388.00",
                'annual_payment_link' => "https://buy.stripe.com/test_7sI3dE5GIeW7c0gaEF",
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
                'stripe_id' => "prod_NgqgxcW1hrYXzS",
                'monthly_payment_link' => "https://buy.stripe.com/test_dR68xY9WYbJV5BS5kp",
                'monthly_price' => "499.00",
                'annual_price' => "4,788.00",
                'annual_payment_link' => "https://buy.stripe.com/test_14kcOe3yA6pB0hydQQ",
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
                'stripe_id' => "prod_Ngqk3BEtjfDGth",
                'monthly_payment_link' => "https://buy.stripe.com/test_fZe5lM9WY8xJaWcaEH",
                'monthly_price' => "899.00",
                'annual_price' => "8988.00",
                'annual_payment_link' => "https://buy.stripe.com/test_3cs01sfhicNZe8o3ce",
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
