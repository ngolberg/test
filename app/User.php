<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token'
    ];

    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

    public static function form()
    {
      return [
        'name' => '',
        'email' => '',
        'password' => '',
      ];
    }

    public function isModer()
    {
      return ($this->role > 0);
    }

    public function isAdmin()
    {
      return ($this->role == 2);
    }
}
