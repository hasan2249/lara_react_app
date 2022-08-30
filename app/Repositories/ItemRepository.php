<?php

namespace App\Repositories;

use App\Models\Item;

class ItemRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Item::class;

    public function create(array $data)
    {
        try {
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
}
