<?php

namespace App\Repositories;

use App\Models\Item;
use App\Models\Category;

class ItemRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Item::class;

    public function create(array $data)
    {
        try {

            // inherit category's discount
            if (isset($data['category_id'])) {
                if (!isset($data['discount'])) {
                    $cat = Category::find($data['category_id']);
                    $data['disount'] = $cat->disount;
                } else {
                    $data['disount'] = $data['discount'];
                }
            } else {
                $data['disount'] = $data['discount'] ?? 0;
            }

            Item::create($data);

            return response()->json([
                'message' => 'Item Created Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while creating a item!!'
            ], 500);
        }
    }


    public function update(array $data, Item $item)
    {
        try {
            $item->fill($data)->update();

            return response()->json([
                'message' => 'Item Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a item!!'
            ], 500);
        }
    }


    public function delete(Item $item)
    {
        try {
            $item->delete();

            return response()->json([
                'message' => 'Item Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a item!!'
            ]);
        }
    }

    public function retriveAllItems()
    {
        try {
            return \DB::table("items")->orderBy('created_at', 'desc')->get();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a category!!'
            ]);
        }
    }
}
