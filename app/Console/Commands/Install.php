<?php

namespace App\Console\Commands;

use Artisan;
use File;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use App\Repositories\RoleRepository;
use Spatie\Permission\Models\Permission;
use App\Repositories\PermissionRepository;
use App\Repositories\EmailTemplateRepository;
use Illuminate\Support\Facades\DB;

class Install extends Command
{

    /**
     *  This command is used to reset the application to factory condition.
     */

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fresh Installation';

    protected $role;
    protected $permission;

    /**
     * Create a new command instance.
     *
     * @param RoleRepository $role
     * @param PermissionRepository $permission
     */
    public function __construct(
        RoleRepository $role,
        PermissionRepository $permission
    ) {
        $this->role           = $role;
        $this->permission     = $permission;

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $bar = $this->output->createProgressBar(8);
        File::put('storage/logs/laravel.log', '');
        $bar->advance();
        $this->newLine();
        $this->warn('Начался процесс установки');
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Artisan::call('config:clear');
        Artisan::call('key:generate');
        $bar->advance();
        $this->warn('Проверка конфигурации');
        $system_variables = getVar('system');
        config(['system' => $system_variables]);
        $bar->advance();
        $this->warn('Проверка подключения к базе данных');
        try {
            DB::connection()->getPdo();
            $this->warn('Подключение к базе данных произошло успешно');
        }catch (\Exception $e) {
            $this->error('Ошибка подключения к базе данных, установка невозможна');
            return 0;
        }
        $this->warn('Загрузка базы данных');
        Artisan::call('migrate:fresh');
        $this->warn('База данных загружена');
        $bar->advance();
        $this->newLine();
        $this->warn('Создание ролей');
        $roles = $this->role->listName();
        foreach (config('system.default_role') as $key => $value) {
            if (!in_array($value, $roles)) {
                Role::create(['name' => strtolower($value)]);
            }
        }
        $bar->advance();
        $this->warn('Создание прав');
        $permissions = $this->permission->listName();
        foreach (config('system.default_permission') as $value) {
            if (!in_array($value, $permissions)) {
                Permission::create(['name' => strtolower($value)]);
            }
        }
        $bar->advance();
        $this->newLine();
        $this->warn('Присвоение прав');
        $role = Role::whereName(config('system.default_role.admin'))->first();
        $role->syncPermissions(config('system.default_permission'));
        $bar->advance();
        $this->warn('Добавление тестовой информации');
        Artisan::call('db:seed');
        $this->warn('Информация добавлена');
        $bar->finish();
        $this->newLine();
        $this->info('Установка завершена');

        return true;
    }
}
