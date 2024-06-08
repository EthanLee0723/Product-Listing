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

    public function delCategory(Request $request)
    {
        ProductCategory::generalQuery()
                         ->where("id",$request->categoryId)
                         ->update(["deleted_at"=>now()]);

        ProductSubcategory::generalQuery()
                            ->where("category_id",$request->categoryId)
                            ->update(["deleted_at"=>now()]);

        Products::generalQuery()
                  ->where("category_id",$request->categoryId)
                  ->update(["deleted_at"=>now()]);
    }

    public function delSubcategory(Request $request)
    {
        $productSubcategory = ProductSubcategory::generalQuery()->where("id",$request->subcategoryId)->first();

        $productCategory = ProductCategory::generalQuery()->where("id",$productSubcategory->category_id)->first();

        $productSubcategory->deleted_at = now();
        $productSubcategory->update();

        $productSubcategoryIdByCategory = ProductSubcategory::generalQuery()
                                                              ->where("category_id",$productSubcategory->category_id)
                                                              ->pluck("id")
                                                              ->toArray();
        $productSubcategoryNameByCategory = ProductSubcategory::generalQuery()
                                                              ->where("category_id",$productSubcategory->category_id)
                                                              ->pluck("subcategory_name")
                                                              ->toArray();
        

        $productCategory->subcategory_id = count($productSubcategoryIdByCategory)?json_encode($productSubcategoryIdByCategory):null;
        $productCategory->subcategory_name = count($productSubcategoryIdByCategory)?json_encode($productSubcategoryNameByCategory):null;                                                  

        $productCategory->update();

        Products::where("subcategory_id",$request->subategoryId)
                  ->update(["deleted_at"=>now()]);
    }

    public function editCategory(Request $request)
    {
        // dd($request->toArray());
        ProductCategory::generalQuery()
                         ->where("id",$request->categoryId)
                         ->update(["category_name"=>$request->categoryName]);

        ProductSubcategory::generalQuery()
                ->where("category_id",$request->categoryId)
                ->update(["category_name"=>$request->categoryName]);

        Products::generalQuery()
                  ->where("category_id",$request->categoryId)
                  ->update(["category_name"=>$request->categoryName]);
    }

    public function editSubcategory(Request $request)
    {

    }

}
