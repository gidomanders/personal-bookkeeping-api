<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use ErrorException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;

class CategoryController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() {
        return Category::whereNull('category_id')->with('child_categories')->orderBy('order', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryStoreRequest $request
     * @return Category
     */
    public function store(CategoryStoreRequest $request) {
        return Category::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return Category
     */
    public function show(Category $category) {
        return $category;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryUpdateRequest $request
     * @param Category $category
     * @return Category
     * @throws ErrorException
     */
    public function update(CategoryUpdateRequest $request, Category $category) {
        if ($category->update($request->validated())) {
            throw new ErrorException();
        }

        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id) {
        if (!Category::destroy($id)) {
            throw new ModelNotFoundException();
        }

        return response('', 204);
    }
}
