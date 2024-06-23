<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $product->subcategory_id = isset($request->subcategoryId)?$request->subcategoryId:null;
        $product->subcategory_name = isset($request->subcategoryId)?$request->subcategoryName:null;
        $product->color_variation = isset($request->colorVariation)? json_encode($request->colorVariation):null;
        $product->price = $request->price;
        $product->stock_count = $request->stockCount;
        $product->product_details = isset($request->productDetails)?json_encode($request->productDetails):null;
        $product->product_table_details = isset($request->productTblDetails)?json_encode($request->productTblDetails):null;

        $product->images= isset($request->productImg)?json_encode(array_map(function($val)
        {
            $fileName = "product_".Carbon::now()->format("dmYHisu").".".$val["fileType"];
            $decoded_image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $val["data"]));
            Storage::disk('product_img')->put($fileName, $decoded_image);   
            return ["imgName"=>$fileName,"fileType"=>$val["fileType"]];

        },$request->productImg)):null;

        $product->status = $request->status === "true"?"active":"inactive";
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

    public function updatePrd(Request $request)
    {
        $product = Products::generalQuery()
                             ->where("id",$request->productId)
                             ->first();

        $productCategory = ProductCategory::generalQuery()
                                            ->where("id",$product->category_id)
                                            ->first();

        $productSubcategory = isset($request->subcategoryId)?ProductSubcategory::generalQuery()
                                                                                 ->where("id",$product->subcategory_id)
                                                                                 ->first():null;

        $product->product_name = $request->productName;
        $product->category_id = $request->categoryId;
        $product->category_name = $request->categoryName;
        $product->subcategory_id = isset($request->subcategoryId)?$request->subcategoryId:null;
        $product->subcategory_name = isset($request->subcategoryId)?$request->subcategoryName:null;
        $product->color_variation = isset($request->colorVariation)? json_encode($request->colorVariation):null;
        $product->price = $request->price;
        $product->stock_count = $request->stockCount;
        $product->product_details = isset($request->productDetails)?json_encode($request->productDetails):null;
        $product->product_table_details = isset($request->productTblDetails)?json_encode($request->productTblDetails):null;
        
        
        $existedImg = $request->productImg?array_filter($request->productImg,function($val){
            return $val["isExist"] === "true";
        }):[];

        $existedImg = array_map(function($val){
            return $val["imgName"];
        },$existedImg);

        if($product->images)
        {
            $array = [];
            foreach($product->images as $ind=>$img)
            {
                if(array_search($img["imgName"],$existedImg) === false)
                {
                    Storage::disk("product_img")->delete($img["imgName"]);
                }
            }
        }
        
        $array = [];
        $product->images = isset($request->productImg)?json_encode(array_map(function($val) use ($array)
        {
            if($val["isExist"] !== "true")
            {  
                $fileName = "product_".Carbon::now()->format("dmYHisu").".".$val["fileType"];
                $decoded_image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $val["data"]));
                Storage::disk('product_img')->put($fileName, $decoded_image);  
            }
            return ["imgName"=>$val["isExist"] === "true"?$val["imgName"]:$fileName,"fileType"=>$val["fileType"]];
        },$request->productImg)):null;
        $product->status = $request->status === "true"?"active":"inactive";
        $product->update();

        if($productCategory->id !== $product->category_id)
        {
            $productCategory->product_id = array_filter($productCategory->product_id,function($val) use ($product)
            {
                return $val !== $product->id;
            });

            $productCategory->product_name = array_filter($productCategory->product_name,function($val) use ($product)
            {
                return $val !== $product->product_name;
            });

            $productCategory->product_id = $productCategory->product_id?json_encode($productCategory->product_id):null;
            $productCategory->product_name = $productCategory->product_name?json_encode($productCategory->product_name):null;
            $productCategory->update();
            
            $productCategory = ProductCategory::generalQuery()
                                                ->where("id",$request->categoryId)
                                                ->first();
            $productCategory->product_id = $productCategory->product_id?array_merge($productCategory->product_id,[$product->id]):[$product->id];
            $productCategory->product_name = $productCategory->product_name?array_merge($productCategory->product_name,[$product->product_name]):[$product->product_name];

            $productCategory->product_id =  json_encode($productCategory->product_id);
            $productCategory->product_name = json_encode($productCategory->product_name);
            $productCategory->update();
        }

        if($productCategory->id !== $product->category_id)
        {
            $productCategory->product_id = array_filter($productCategory->product_id,function($val) use ($product)
            {
                return $val !== $product->id;
            });

            $productCategory->product_name = array_filter($productCategory->product_name,function($val) use ($product)
            {
                return $val !== $product->product_name;
            });

            $productCategory->product_id = $productCategory->product_id?json_encode($productCategory->product_id):null;
            $productCategory->product_name = $productCategory->product_name?json_encode($productCategory->product_name):null;
            $productCategory->update();
            
            $productCategory = ProductCategory::generalQuery()
                                                ->where("id",$request->categoryId)
                                                ->first();
            $productCategory->product_id = $productCategory->product_id?array_merge($productCategory->product_id,[$product->id]):[$product->id];
            $productCategory->product_name = $productCategory->product_name?array_merge($productCategory->product_name,[$product->product_name]):[$product->product_name];

            $productCategory->product_id =  json_encode($productCategory->product_id);
            $productCategory->product_name = json_encode($productCategory->product_name);
            $productCategory->update();
        }

        if((!$productSubcategory && $product->subcategory_id) || ($productSubcategory && $productSubcategory->id !== $product->subcategory_id))
        {
            if($productSubcategory)
            {
                $productSubcategory->product_id = array_filter($productSubcategory->product_id,function($val) use ($product)
                {
                    return $val !== $product->id;
                });
    
                $productSubcategory->product_name = array_filter($productSubcategory->product_name,function($val) use ($product)
                {
                    return $val !== $product->product_name;
                });
    
                $productSubcategory->product_id = $productSubcategory->product_id?json_encode($productSubcategory->product_id):null;
                $productSubcategory->product_name = $productSubcategory->product_name?json_encode($productSubcategory->product_name):null;
                $productSubcategory->update();
            }
            
            if($request->subcategoryId)
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
    }

    public function prdStatusChg(Request $request)
    {
        $product = Products::generalQuery()
                             ->where("id",$request->prdId)
                             ->first();

        $product->status = $product->status === "active"?"inactive":"active";
        $product->update();
    }

    public function delPrd(Request $request)
    {
        $prdToDel = Products::generalQuery()
                              ->where("id",$request->productId)
                              ->first();
        $prdToDel->deleted_at = now();

        if($prdToDel->images)
        {
            foreach($prdToDel->images as $img)
            {
                Storage::disk("product_img")->delete($img["imgName"]);
            }
        }

        $prdCategory = ProductCategory::generalQuery()
                                        ->where("id",$prdToDel->category_id)
                                        ->first();

        $prdCategory->product_id = array_filter($prdCategory->product_id,function($val) use ($prdToDel)
        {
            return $val !== $prdToDel->id;
        });

        $prdCategory->product_name = array_filter($prdCategory->product_name,function($val) use ($prdToDel)
        {
            return $val !== $prdToDel->product_name;
        });

        $prdCategory->product_id = $prdCategory->product_id?json_encode($prdCategory->product_id):null;
        $prdCategory->product_name = $prdCategory->product_name?json_encode($prdCategory->product_name):null;
        $prdCategory->update();

        if($prdToDel->subcategory_id)
        {
            $prdSubcategory = ProductSubcategory::generalQuery()
                                                  ->where("id",$prdToDel->subcategory_id)
                                                  ->first();

            $prdSubcategory->product_id = array_filter($prdSubcategory->product_id,function($val) use ($prdToDel)
            {
                return $val !== $prdToDel->id;
            });
    
            $prdSubcategory->product_name = array_filter($prdSubcategory->product_name,function($val) use ($prdToDel)
            {
                return $val !== $prdToDel->product_name;
            });
            $prdSubcategory->product_id = $prdSubcategory->product_id?json_encode($prdSubcategory->product_id):null;
            $prdSubcategory->product_name = $prdSubcategory->product_name?json_encode($prdSubcategory->product_name):null;
            $prdSubcategory->update();
        }

        $prdToDel->update();
        
    }

    public function getAllProducts()
    {
        return Products::generalQuery()
                         ->select("*")
                         ->addSelect(DB::raw("CONVERT_TZ(created_at,'+00:00','+08:00') AS createdAt"))
                         ->get();
    }

    public function getActiveProducts()
    {
        return Products::generalQuery()
                         ->where("status","active")
                         ->get();
    }

    public function getProductDetails(Request $request,$prdId)
    {
        $prdDetails = Products::generalQuery()
                                ->where("status","active")
                                ->where("id",$prdId)
                                ->first();

        return view("productsDetailsPage",["prdDetails"=>$prdDetails]);
    }

}
