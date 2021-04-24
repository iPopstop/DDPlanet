<?php

namespace App\Repositories;

use App\Models\Application;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ApplicationRepository
{
    protected $application;

    /**
     * Instantiate a new instance.
     *
     * @param Application $application
     */
    public function __construct(Application $application)
    {
        $this->application = $application;
    }

    /**
     * Get all applications with profile
     *
     * @return Application
     */
    public function getAll()
    {
        return $this->application->get();
    }

    /**
     * Count applications
     *
     * @return integer
     */
    public function count()
    {
        return $this->application->count();
    }

    /**
     * Count applications registered between dates
     *
     * @return integer
     */
    public function countDateBetween($start_date, $end_date)
    {
        return $this->application->whereBetween('start', ['start_date' => $start_date, 'end_date' => $end_date])->count();
    }

    /**
     * Find application by Id
     *
     * @param integer $id
     * @return Application
     */

    public function findOrFail($id = null)
    {
        $application = $this->application->with(['user', 'closedBy'])->findOrFail($id);

        if (!$application) {
            throw ValidationException::withMessages(['message' => trans('application.could_not_find')]);
        }

        return $application;
    }


    /**
     * Update given application.
     *
     * @param Application $application
     * @param array $params
     *
     * @return Application
     */
    public function update(Application $application, $params = array())
    {
        $application->update($params);

        return $application;
    }

    /**
     * Delete application.
     *
     * @param integer $id
     * @return bool|null
     */
    public function delete(Application $application)
    {
        return $application->delete();
    }

    public function paginate($params = array())
    {
        $sort_by               = $params['sort_by'] ?? 'created_at';
        $order                 = $params['order'] ?? 'desc';
        $page_length           = $params['page_length'] ?? config('config.page_length');
        $status           = $params['status'] ?? null;
        $id           = $params['id'] ?? null;
        $phone           = $params['phone'] ?? null;
        $employee           = $params['employee'] ?? null;
        $mine = isset($params['mine']) ? checkBool($params['mine']) : false;

        $query = $this->application->filterByStatus($status)->filterById($id)->filterByPhone($phone);

        $user = auth()->check() ? auth()->user() : null;

        if($user && $user->hasRole('Администратор')) {
            $query->filterByEmployee($employee);
        }

        if(($user && !$user->hasRole('Администратор'))) {
            $query->where('user_id', $user->id);
        }

        if($user && $mine) {
            $query->where('user_id', $user->id);
        }

        $query->orderBy($sort_by, $order);

        return $query->paginate($page_length);
    }

    /**
     * Delete multiple applications.
     *
     * @param array $ids
     * @return bool|null
     */
    public function deleteMultiple($ids)
    {
        return $this->application->whereIn('id', $ids)->delete();
    }
}
