<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'workspace_id',
        'stripe_id',
        'pages',
        'seats',
        'clients',
        'vault_access',
        'reports_access',
        'integrations_access',
        'support_access',
    ];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
}
