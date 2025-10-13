<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaveFile extends Model
{
    //
    protected $table = 'save_files';

    protected $fillable = [
        'user_id',
        'save_data',
        'created_at',
        'updated_at',
    ];
}
