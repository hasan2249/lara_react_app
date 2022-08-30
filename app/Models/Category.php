<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Relationships\CategoryRelationships;

class Category extends Model
{
    use HasFactory, CategoryRelationships;

    protected $fillable = ['title', 'level', 'disount'];
}
