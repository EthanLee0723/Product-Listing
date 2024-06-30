<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect("/home");
});

Route::group(["prefix"=>"/home"],function()
{
    Route::get("/",function(){
        return view('homePage');
    });

    Route::get("/getLatestPrd","MainController@getLatestPrd");

    Route::post('/signUpNewsletter',"MainController@signUpNewsletter");
});

Route::get('/about', function () {
    return view('aboutPage');
});

Route::get('/FAQ',function(){
    return view("faqPage");
});

Route::group(["prefix"=>"/contact"],function()
{
    Route::get("/",function(){
        return view("contactPage");
    });

    Route::post("/sendContactUsMsg","MainController@sendContactUsMsg");
});

Route::group(["prefix"=>"manageProducts",'middleware'=>['checkAdminSession']],function()
{
    Route::get("/",function()
    {
        return view("manageProducts");
    });

    Route::get("/getProductsCategories","ProductsController@getProductsCategories");

    Route::get("/getProductsSubcategories","ProductsController@getProductsSubcategories");

    Route::get("/getAllProducts","ProductsController@getAllProducts");

    Route::post("/createNewProduct","ProductsController@createNewProduct");

    Route::post("/updatePrd","ProductsController@updatePrd");

    Route::post("/delPrd","ProductsController@delPrd");

    Route::post("/prdStatusChg","ProductsController@prdStatusChg");
});

Route::group(["prefix"=>"/manageCategories",'middleware'=>['checkAdminSession']],function()
{
    Route::get("/",function()
    {
        return view("manageCategories");
    });

    Route::post("/createCategory","ProductsController@createCategory");

    Route::post("/createSubcategory","ProductsController@createSubcategory");

    Route::post("/delCategory","ProductsController@delCategory");

    Route::post("/delSubcategory","ProductsController@delSubcategory");

    Route::post("/editCategory","ProductsController@editCategory");

    Route::post("/editSubcategory","ProductsController@editSubcategory");

});

Route::group(["prefix"=>"login"],function()
{   
    Route::get("/",function(){
        return view("loginPage");
    });

    Route::post("/","MainController@login");    
});

Route::group(["prefix"=>"/products"],function()
{
    Route::get("/",function(){
        return view("productsPage");
    });

    Route::get("/productDetails/{id}","ProductsController@getProductDetails");
    
    Route::post("/getProductsByFilter","ProductsController@getProductsByFilter");

    // Route::get("/getActiveProducts","ProductsController@getActiveProducts");

    Route::get("/getActivePrdByFilter","ProductsController@getActivePrdByFilter");

    Route::post("/getProudctListingCategories","ProductsController@getProudctListingCategories");
});

Route::get("/logout","MainController@logout");
