<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Transaksi extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'transaksi';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama',
        'currency',
        'debit',
        'vendor',
        'lokasi',
        'lok_coord_lon',
        'lok_coord_lat',
        'tipe',
        'author',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'transaction_code',
    ];
}
