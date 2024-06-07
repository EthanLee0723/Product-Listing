<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;

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

    public function createCategory(Request $request)
    {
        $productCategory = new ProductCategory;
        $productCategory->category_name = $request->categoryName;
        $productCategory->save();
    }

    public function createSubcategory(Request $request)
    {
        $productSubcategory = new ProductSubcategory;
        $productSubcategory->category_id = $request->categoryId;
        $productSubcategory->category_name = $request->categoryName;
        $productSubcategory->subcategory_name = $request->subcategoryName;
        $productSubcategory->save();

        $productCategory = ProductCategory::generalQuery()
                                            ->where("id",$request->categoryId)
                                            ->first();
        
        $arrCategoryId = [$productSubcategory->id];
        $arrSubcategoryName = [$request->subcategoryName];

        $productCategory->subcategory_id = $productCategory->subcategory_id?array_merge($productCategory->subcategory_id,$arrCategoryId):$arrCategoryId;
        $productCategory->subcategory_name = $productCategory->subcategory_name?array_merge($productCategory->subcategory_name,$arrSubcategoryName):$arrSubcategoryName;

        $productCategory->subcategory_id = json_encode($productCategory->subcategory_id);
        $productCategory->subcategory_name = json_encode($productCategory->subcategory_name);

        $productCategory->update();

    }

}
