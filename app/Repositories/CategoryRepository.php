<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Category::class;

    public function create(array $data)
    {
        try {
            Category::create($data);

            return response()->json([
                'message' => 'Category Created Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while creating a category!!'
            ], 500);
        }
    }


    public function update(array $data, Category $category)
    {
        try {
            $category->fill($data)->update();

            return response()->json([
                'message' => 'Category Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a category!!'
            ], 500);
        }
    }


    public function delete(Category $category)
    {
        try {
            $category->delete();

            return response()->json([
                'message' => 'Category Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a category!!'
            ]);
        }
    }

    public function retriveAllCategories()
    {
        try {
            return \DB::table("categories")->get();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a category!!'
            ]);
        }
    }
}
