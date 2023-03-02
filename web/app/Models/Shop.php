<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['setting_emails','email_time'];
    public function getEmailTimeAttribute($time)
    {
        $date=date_create($time);
        return date_format($date,"H:i");
    }
}
