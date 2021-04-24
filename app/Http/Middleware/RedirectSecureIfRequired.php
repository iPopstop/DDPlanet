<?php

namespace App\Http\Middleware;

use Closure;

class RedirectSecureIfRequired
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (\App::environment('production') && config('config.https')) {
            \Request::setTrustedProxies([$request->getClientIp()],Request::HEADER_X_FORWARDED_ALL);

            if (!$request->isSecure()) {
                return redirect()->secure($request->getRequestUri());
            }
        }

        return $next($request);
    }
}
