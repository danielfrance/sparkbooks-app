<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'stripe_id',
        'monthly_price',
        'monthly_payment_link',
        'annual_price',
        'annual_payment_link',
        'seats',
        'clients',
        'pages',
        'vault_access',
        'reports_access',
        'integrations_access',
        'support_access',
    ];
}
