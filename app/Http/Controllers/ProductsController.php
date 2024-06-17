<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use Carbon\Carbon;
use DB;

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
        $productSubcategory = ProductSubcategory::generalQuery()
                                                  ->where("id",$request->subcategoryId)
                                                  ->first();

        $productSubcategory->subcategory_name = $request->subcategoryName;
        $productSubcategory->save();

        $productSubcategoryNameByCategory = ProductSubcategory::generalQuery()
                                                                ->where("category_id",$productSubcategory->category_id)
                                                                ->pluck("subcategory_name")
                                                                ->toArray();

        ProductCategory::generalQuery()
                         ->where("id",$productSubcategory->category_id)
                         ->update(["subcategory_name"=>count($productSubcategoryNameByCategory)?json_encode($productSubcategoryNameByCategory):null]);

        ProductCategory::generalQuery()
                         ->where("subcategory_id",$request->subcategoryId)
                         ->update(["subcategory_name"=>$request->subcategoryName]);
        
    }

    public function getProductsCategories()
    {
        $productCategory =  ProductCategory::generalQuery()
                                             ->select(["id","category_name as text"])
                                             ->get()
                                             ->toArray();

        return ["results"=>$productCategory];
    }

    public function getProductsSubcategories()
    {
        $productSubcategory =  ProductSubcategory::generalQuery()
                                                   ->select(["id","subcategory_name as text"])
                                                   ->get()
                                                   ->toArray();

        return ["results"=>$productSubcategory];
    }

    public function createNewProduct(Request $request)
    {
        $product = new Products;
        $product->product_name = $request->productName;
        $product->category_id = $request->categoryId;
        $product->category_name = $request->categoryName;
        if(isset($request->subcategoryId))
        {
            $product->subcategory_id = $request->subcategoryId;
            $product->subcategory_name = $request->subcategoryName;
        }

        if(isset($request->colorVariation))
        {
            $product->color_variation = json_encode($request->colorVariation);
        }
        $product->price = $request->price;
        $product->stock_count = $request->stockCount;
        if(isset($request->productDetails))
        {
            $product->product_details = json_encode($request->productDetails);
        }

        if(isset($request->productTblDetails))
        {
            $product->product_table_details = json_encode($request->productTblDetails);
        }
        
        if(isset($request->productImg))
        {
            $request->productImg = array_map(function($val)
            {
                if(isset($val["imgName"]))
                {
                    return $val;
                }
                else
                {
                    return ["imgName"=>"product_".Carbon::now()->timestamp,"fileType"=>$val["fileType"]];
                }
            },$request->productImg);

            $product->images = json_encode($request->productImg);
        }
        $product->status = $request->status?"active":"inactive";
        $product->save();

        $productCategory = ProductCategory::generalQuery()
                                            ->where("id",$request->categoryId)
                                            ->first();

        $productCategory->product_id = $productCategory->product_id?array_merge($productCategory->product_id,[$product->id]):[$product->id];
        $productCategory->product_name = $productCategory->product_name?array_merge($productCategory->product_name,[$product->product_name]):[$product->product_name];

        $productCategory->product_id =  json_encode($productCategory->product_id);
        $productCategory->product_name = json_encode($productCategory->product_name);
        $productCategory->update();

        if(isset($request->subcategoryId))
        {
            $productSubcategory = ProductSubcategory::generalQuery()
                                                      ->where("id",$request->subcategoryId)
                                                      ->first();

            $productSubcategory->product_id = $productSubcategory->product_id?array_merge($productSubcategory->product_id,[$product->id]):[$product->id];
            $productSubcategory->product_name = $productSubcategory->product_name?array_merge($productSubcategory->product_name,[$product->product_name]):[$product->product_name];
    
            $productSubcategory->product_id =  json_encode($productSubcategory->product_id);
            $productSubcategory->product_name = json_encode($productSubcategory->product_name);
            $productSubcategory->update();
        }
    }

    public function getAllProducts()
    {
        return Products::generalQuery()
                         ->select(DB::raw("CONVERT_TZ(created_at,'+00:00','+08:00') AS createdAt"),"id","product_name","category_name","subcategory_name","status")
                         ->get();
    }

}
