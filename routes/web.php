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

Route::get("/home",function(){
    return view("homePage");
});

Route::get('/about', function () {
    return view('aboutPage');
});

Route::get('/FAQ',function(){
    return view("faqPage");
});

Route::get("/contact",function(){
    return view("contactPage");
});

Route::get("/manageProducts",function()
{
    return view("manageProducts");
});

Route::group(["prefix"=>"/manageCategories"],function()
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

    Route::post("/getProudctListingCategories","ProductsController@getProudctListingCategories");
});
