<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Relationships\ItemsRelationships;

class Item extends Model
{
    use HasFactory, ItemsRelationships;

    protected $fillable = ['name', 'description', 'disount', 'category_id', 'price'];
}
