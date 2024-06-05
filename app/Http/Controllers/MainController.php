<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
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
}
