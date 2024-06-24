<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class CheckAdminSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Session::get("isAdmin"))
        {
            return $next($request);
        }
        else
        {
            return redirect("/home");
        }
    }
}
