<?php
namespace App\Repositories;

use App\Models\Cat;
use App\Models\Institution;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use DB;
use Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthRepository
{
    protected UserRepository $user;
    protected $config;

    /**
     * Instantiate a new instance.
     *
     * @param  \App\Repositories\UserRepository  $user
     * @param  \App\Repositories\ConfigurationRepository  $config
     */
    public function __construct(
        UserRepository $user,
        ConfigurationRepository $config
    ) {
        $this->user = $user;
        $this->config = $config;
    }

    /**
     * Authenticate an user.
     *
     * @param  array  $params
     *
     * @return array
     * @throws \Illuminate\Validation\ValidationException
     */
    public function auth($params = [])
    {
        $this->validateLogin($params);

        $auth_user = $this->user->findByEmail($params['email']);

        //$this->validateStatus($auth_user);

        return [
            'user' => $auth_user,
        ];
    }

    /**
     * Validate login credentials.
     *
     * @param  array  $params
     *
     * @return bool
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateLogin($params = [])
    {
        $email = $params['email'] ?? null;
        $password = $params['password'] ?? null;
        $remember = isset($params['remember_me']) ? checkBool($params['remember_me']) : false;

        /*if(Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
            //Auth::login([$email, $password], $remember);
        }*/

        if ((!Auth::attempt(['email' => $email, 'password' => $password], $remember))) {
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        return true;
    }

    /**
     * Validate authenticated user status.
     *
     * @param authenticated user
     * @return null
     */
    public function validateStatus($auth_user)
    {
        return true;
    }

    /**
     * Validate auth token.
     *
     * @return array
     * @throws \Illuminate\Validation\ValidationException
     * @throws \JsonException
     */
    public function check()
    {
        config(['session.lifetime' => 120]);

        if (!Auth::check()) {
            return ['authenticated' => false, 'config' => []];
        }

        $authenticated = true;
        $configuration                  = $this->config->getAllPublic();
        $configuration['post_max_size'] = getPostMaxSize();
        $configuration['pagination']    = config('system.pagination');

        $user = $this->user->findOrFail(auth()->user()->id);
        $user['roles_list'] = $user->getRoleNames();
        $permissions = $user->getAllPermissions();
        $default_role = config('system.default_role');

        return [
            'authenticated' => $authenticated,
            'user' => $user,
            'config' => $configuration,
            'permissions'   => $permissions,
            'default_role'  => $default_role
        ];
    }
    /**
     * Check for registration availability.
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateRegistrationStatus()
    {
        if (! config('config.registration')) {
            throw ValidationException::withMessages(['message' => trans('general.feature_not_available')]);
        }
    }

    /**
     * Check for email verification availability.
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateEmailVerificationStatus()
    {
        if (!config('config.email_verification')) {
            throw ValidationException::withMessages([
                'message' => trans('general.feature_not_available'),
            ]);
        }
        return true;
    }

    /**
     * Check for account approval availability.
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateAccountApprovalStatus()
    {
        if (!config('config.account_approval')) {
            throw ValidationException::withMessages([
                'message' => trans('general.feature_not_available'),
            ]);
        }
    }

    /**
     * Check for reset password availability.
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateResetPasswordStatus()
    {
        if (!config('config.reset_password')) {
            throw ValidationException::withMessages([
                'message' => trans('general.feature_not_available'),
            ]);
        }
    }

    /**
     * Activate user's account.
     *
     * @param  null  $activation_token
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function activate($activation_token = null)
    {
        $this->validateRegistrationStatus();

        $this->validateEmailVerificationStatus();

        $user = $this->user->find($activation_token);

        if (!$user) {
            throw ValidationException::withMessages([
                'message' => trans('auth.invalid_token'),
            ]);
        }

        if ($user->status === 'activated') {
            throw ValidationException::withMessages([
                'message' => trans('auth.account_already_activated'),
            ]);
        }

        if ($user->status !== 'pending_activation') {
            throw ValidationException::withMessages([
                'message' => trans('auth.invalid_token'),
            ]);
        }

        $user->status = config('config.account_approval')
            ? 'pending_approval'
            : 'activated';
        $user->save();
        $user->notify(new Activated($user));
    }

    /**
     * Validate user for reset password.
     *
     * @param  email  $email
     *
     * @return User
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateUserAndStatusForResetPassword($email = null)
    {
        $user = $this->user->findByEmail($email);

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => trans('passwords.user'),
            ]);
        }

        if ($user->status !== 'activated') {
            throw ValidationException::withMessages([
                'email' => trans('passwords.account_not_activated'),
            ]);
        }

        return $user;
    }

    /**
     * Request password reset token of user.
     *
     * @param  array
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
/*    public function password($params = [])
    {
        $this->validateResetPasswordStatus();

        $user = $this->validateUserAndStatusForResetPassword($params['email']);

        $token = Str::uuid();
        DB::table('password_resets')->insert([
            'email' => $params['email'],
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        $user->notify(new PasswordReset($user, $token));
    }*/

    /**
     * Validate reset password token.
     *
     * @param  string  $token
     * @param  null  $email  $email
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateResetPasswordToken(string $token, $email = null)
    {
        if ($email) {
            $reset = DB::table('password_resets')
                ->where('email', '=', $email)
                ->where('token', '=', $token)
                ->first();
        } else {
            $reset = DB::table('password_resets')
                ->where('token', '=', $token)
                ->first();
        }

        if (!$reset) {
            throw ValidationException::withMessages([
                'message' => trans('passwords.token'),
            ]);
        }

        if (
            date(
                "Y-m-d H:i:s",
                strtotime(
                    $reset->created_at .
                        "+" .
                        config('config.reset_password_token_lifetime') .
                        " minutes"
                )
            ) < date('Y-m-d H:i:s')
        ) {
            throw ValidationException::withMessages([
                'email' => trans('passwords.token_expired'),
            ]);
        }
    }

    /**
     * Reset password of user.
     *
     * @param  array
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function reset($params = [])
    {
        $this->validateResetPasswordStatus();

        $user = $this->validateUserAndStatusForResetPassword($params['email']);

        $this->validateResetPasswordToken($params['token'], $params['email']);

        $this->resetPassword($params['password'], $user);

        DB::table('password_resets')
            ->where('email', '=', $params['email'])
            ->where('token', '=', $params['token'])
            ->delete();

        $user->notify(new PasswordResetted($user));
    }

    /**
     * Update user password.
     *
     * @param  string  $password
     * @param  null  $user
     *
     * @return null
     */
    public function resetPassword(string $password, $user = null)
    {
        $user = $user ?: Auth::user();
        $user->password = bcrypt($password);
        $user->save();
    }

    /**
     * Validate current password of user.
     *
     * @param  string  $password
     *
     * @return null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateCurrentPassword(string $password)
    {
        if (!Hash::check($password, Auth::user()->password)) {
            throw ValidationException::withMessages([
                'message' => trans('passwords.password_mismatch'),
            ]);
        }
    }
}
