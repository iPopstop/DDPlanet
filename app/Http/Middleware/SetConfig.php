<?php

namespace App\Http\Middleware;

use App\Repositories\ConfigurationRepository;
use Closure;

class SetConfig
{
    protected $config;

    public function __construct(ConfigurationRepository $config)
    {
        $this->config = $config;
    }

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->config->setDefault();

        return $next($request);
    }
}
