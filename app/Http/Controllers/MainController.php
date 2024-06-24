<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\NewsletterSignedUp;
use App\Models\Products;
use Session;

class MainController extends Controller
{
    public function login(Request $request)
    {
        $user = User::generalQuery()
                      ->where("email",$request->email)
                      ->first();
        
        if($user && Hash::check($request->pwd,$user->password))
        {
            Session::put("isAdmin","true");
            return response("success");
        }
        else
        {
            return response("failed",500);
        }

    }

    public function logout(Request $request)
    {
        Session::flush();
        return redirect("/login");
    }

    public function signUpNewsletter(Request $request)
    {
        $newsletterSignedUp = new NewsletterSignedUp;
        $newsletterSignedUp->email = $request->newsletterEmail;
        $newsletterSignedUp->save();

    }

    public function getLatestPrd(Request $request)
    {
        return Products::generalQuery()
                         ->where("status","active")
                         ->orderBy("created_at","desc")
                         ->limit(9)
                         ->get();
    }
}
