<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password',
        'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function toArray() {
        $array = parent::toArray();
        $array['fio'] = "{$this->last_name} {$this->first_name} {$this->patronymic}";
        return $array;
    }

    public function applications() {
        return $this->hasMany(Application::class);
    }

    public function username()
    {
        return 'email';
    }

    public function scopeFilterByEmail($q, $email = null)
    {
        if (!$email) {
            return $q;
        }

        return $q->where('email', $email);
    }

    public function scopeFilterByDate($q, $period = null)
    {
        if (!$period || count($period) < 2) {
            return $q;
        }

        return $q->whereBetween('created_at', [Carbon::parse($period[0]), Carbon::parse($period[1])]);
    }
}
