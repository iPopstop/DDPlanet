<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Repositories\AuthRepository;
use App\Repositories\UserRepository;
use Auth;
use Illuminate\Http\Request;

/**
 * Class AuthController
 *
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    /**
     * @var \Illuminate\Http\Request
     */
    protected Request $request;

    /**
     * @var \App\Repositories\AuthRepository
     */
    protected AuthRepository $repo;

    /**
     * @var \App\Repositories\UserRepository
     */
    protected UserRepository $user;

    /**
     * @var string
     */
    protected string $module = 'user';

    /**
     * Instantiate a new controller instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Repositories\AuthRepository  $repo
     * @param  \App\Repositories\UserRepository  $user
     */
    public function __construct(
        Request $request,
        AuthRepository $repo,
        UserRepository $user
    ) {
        $this->request = $request;
        $this->repo = $repo;
        $this->user = $user;
    }

    /**
     * Used to authenticate user
     * @post ("/api/auth/login")
     *
     * @param  \App\Http\Requests\LoginRequest  $request
     *
     * @return Response
     * @Parameter("email", type="email", required="true", description="Email of
     *   User"),
     * @Parameter("password", type="password", required="true",
     *   description="Password of User"),
     * })
     *
     * @throws \Exception
     */
    public function login(LoginRequest $request)
    {
        $auth = $this->repo->auth($this->request->all());

        $auth_user = $auth['user'];

        $reload =
            config('app.locale') !== cache('locale') ||
            config('config.direction') !== cache('direction')
                ? 1
                : 0;

        return $this->success([
            'message' => __("You are logged in!"),
            'user' => $auth_user,
            'reload' => $reload,
        ]);
    }

    /**
     * Used to check user authenticated or not
     * @post ("/api/auth/check")
     *
     * @return Response
     * @throws \Illuminate\Validation\ValidationException
     * @throws \JsonException
     */
    public function check()
    {
        return $this->success($this->repo->check());
    }

    /**
     * Used to logout user
     * @post ("/api/auth/logout")
     *
     * @return Response
     */
    public function logout()
    {
        Auth::guard('web')->logout();

        return $this->success(['message' => __('You are logged out!')]);
    }
}
