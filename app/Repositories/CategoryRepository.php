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
            // if the category has parent to inherit
            if (!is_null($data['category_id'])) {
                // inherit category's discount
                $cat = Category::find($data['category_id']);

                // level of category
                $data['level'] = $cat->level + 1;

                // if there is no specific discount
                if ($data['discount'] == 0 || is_null($data['discount'])) {
                    $data['disount'] = $cat->disount;
                } else {
                    $data['disount'] = $data['discount'];
                }

                if ($data['level'] > 4) {
                    return response()->json([
                        'message' => 'Sorry, The maximum level of subcategories is 4'
                    ], 500);
                }
            } else {
                $data['level'] = 1;
                $data['disount'] = $data['discount'] ?? 0;
            }

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
            // if there is no specific discount
            if (!isset($data['discount'])) {
                // if the category has parent to inherit
                if (!is_null($data['category_id'])) {

                    // inherit category's discount
                    $cat = Category::find($data['category_id']);
                    $data['disount'] = $cat->disount;

                    // level of category
                    $data['level'] = $cat->level + 1;

                    if ($data['level'] > 4) {
                        return response()->json([
                            'message' => 'Sorry, The maximum level of subcategories is 4'
                        ], 500);
                    }
                }
            }

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
            return \DB::table("categories")->orderBy('created_at', 'desc')->get();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a category!!'
            ]);
        }
    }

    public function retriveSubcategories(Category $category)
    {
        try {
            return \DB::table("categories")->where('category_id', $category->id)->get();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while retrival subcategories'
            ]);
        }
    }
}
