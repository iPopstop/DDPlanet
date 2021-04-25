<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationRequest;
use App\Models\Application;
use App\Models\User;
use App\Repositories\ApplicationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ApplicationController extends Controller
{
    protected $user;
    protected $repo;

    public function __construct(ApplicationRepository $repo)
    {
        $this->user = auth()->user();
        $this->repo = $repo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $info = $this->repo->paginate($request->all());
        $users = auth()->user()->hasRole('Администратор') ? User::all() : [];
        return $this->success(compact('info', 'users'));
    }

    public function stats(Request $request)
    {
        $period = $request->has('periods') ? $request->periods : null;
        $data = [
            'users' => [
                'total' => User::filterByDate($period)->count(),
                'admins' => User::filterByDate($period)->whereHas('roles', function ($q) {
                    $q->where('name', 'Администратор');
                })->count(),
            ],
            'applications' => [
                'total' => Application::filterByDate($period)->count(),
                'closed' => Application::filterByDate($period)->where('status', Application::CLOSED)->count(),
                'opened' => Application::filterByDate($period)->where('status', Application::OPENED)->count()
            ],
            'stats' => [
                'dts' => array_keys(Application::filterByDate($period)->oldest('updated_at')->get()->groupBy(function ($date) {
                    return Carbon::parse($date->updated_at)->format('d.m.Y');
                })->toArray()),
                'cats' => ['Новое', 'Завершено'],
                'categories' => [
                    Application::filterByDate($period)->oldest('updated_at')->get()->groupBy('status')->map(function ($i) {
                        return $i->groupBy(function ($date) {
                            return Carbon::parse($date->updated_at)->format('d.m.Y');
                        })->map->count();
                    })
                ],
            ]
        ];

        return $this->success(compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(ApplicationRequest $request)
    {
        $info = Application::create($request->all());
        return $this->success(['info' => $info, 'message' => 'Обращение создано']);
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return Response
     */
    public function show($id)
    {
        $data = $this->repo->findOrFail($id);
        $data['users'] = User::all();
        return $this->ok(compact('data'));
    }

    public function close($id, Request $request)
    {
        $application = $this->repo->findOrFail($id);
        $application->update([
            'closed_by' => auth()->user()->id,
            'reason' => $request->reason,
            'closed_at' => now(),
            'status' => Application::CLOSED
        ]);

        return $this->success(['message' => 'Обращение завершено']);
    }

    public function user($id, Request $request)
    {
        $application = $this->repo->findOrFail($id);
        $application->update([
            'user_id' => $request->has('user_id') ? $request->user_id : null
        ]);

        return $this->success(['message' => 'Сотрудник закреплён', 'id' => $request->user_id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}