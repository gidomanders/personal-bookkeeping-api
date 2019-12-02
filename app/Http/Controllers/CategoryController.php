<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use ErrorException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CategoryController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection
     */
    public function index(Request $request) {
        $query = QueryBuilder::for(Category::class)
            ->allowedFilters([AllowedFilter::exact('category_id'), 'flexible'])
            ->allowedSorts(['order', 'flexible'])
            ->defaultSort('order')
            ->allowedAppends(['has_child_categories']);

        if (!$request->has('filter.category_id')) {
            $query->whereNull('category_id');
        }

        return $query->get();
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
