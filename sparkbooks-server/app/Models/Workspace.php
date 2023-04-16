<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laratrust\Traits\LaratrustTeamTrait;
use Laravel\Cashier\Billable;
use Laravel\Cashier\Subscription;

class Workspace extends Model
{
    use HasFactory, LaratrustTeamTrait, Billable;

    protected $fillable = ['name', 'address', 'city', 'state', 'zip', 'phone', 'email', 'stripe_id', 'pm_type', 'pm_last_four', 'remaining_monthly_pages'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function info()
    {
        return [
            'name' => $this->name,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'zip' => $this->zip,
            'phone' => $this->phone,
            'email' => $this->email,
        ];
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function uploads()
    {
        return $this->hasMany(Upload::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function subscriptionDetails()
    {
        return $this->hasOne(SubscriptionDetails::class);
    }

}
