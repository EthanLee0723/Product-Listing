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

Route::get("/products",function(){
    return view("productsPage");
});
