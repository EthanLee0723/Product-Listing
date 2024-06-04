<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\ProductCategory;

class ProductsController extends Controller
{
    public function getProductsByFilter(Request $request)
    {
        $products = Products::generalQuery();

        if(isset($request->categoryId))
        {
            $products->where("category_id",$request->categoryId);
        }
        else if(isset($request->subcategoryId))
        {
            $products->where("subcategory_id",$request->subcategoryId);
        }

        return $products->get();
    }

    public function getProudctListingCategories()
    {
        return ProductCategory::generalQuery()->get();
    }

    public function createNewProduct()
    {
        
    }

    public function createNewProductCategory()
    {

    }

    public function createNewSubProductCateogry()
    {

    }

}
