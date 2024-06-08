<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\ProductCategory;
use Storage;

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

    public function uploadimages(Request $request){

        // Check if the request has files
        if ($request->hasFile('images')) {
            $uploadedFiles = $request->file('images'); // Get the uploaded files
            $filePaths = [];

            Storage::disk('uploads') -> put($uploadedFiles, file_get_contents($uploadedFiles -> getRealPath()));





            // Return the file paths or any other response as required
            return response()->json(['file_paths' => $filePaths], 200);
        }


    }


}
