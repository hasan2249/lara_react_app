<?php

namespace App\Models\Relationships;

use App\Models\Category;

trait ItemsRelationships
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
