<?php

namespace App\Models\Relationships;

use App\Models\Item;
use App\Models\Category;

trait CategoryRelationships
{

    public function items()
    {
        return $this->hasMany(Item::class, 'category_id');
    }

    // Get subcatigories
    public function sub_categories()
    {
        return $this->hasMany(Category::class, 'category_id');
    }

    // Get the parent category
    public function parent_category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
