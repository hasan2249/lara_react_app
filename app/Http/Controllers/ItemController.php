<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Repositories\ItemRepository;
use App\Http\Resources\ItemResource;

class ItemController extends Controller
{
    protected $item_repository;

    public function __construct(ItemRepository $item_repository)
    {
        $this->item_repository = $item_repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = $this->item_repository->retriveAllItems();
        return ItemResource::collection($items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = \Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'disount' => 'required',
            'price' => 'required',
            'catygory_id' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json(['success' => false, 'message' => $validation->messages()->first()], 200);
        }

        $data = $request->only([
            'name',
            'description',
            'disount',
            'price'
        ]);

        return $this->item_repository->create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return response()->json([
            'item' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        $data = $request->only([
            'title',
            'level',
            'disount',
            'catygory_id'
        ]);

        return $this->item_repository->update($data, $item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        return $this->item_repository->delete($item);
    }
}
