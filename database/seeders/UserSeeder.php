<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $admin = User::create([
            'email' => 'administrator@popstop.space',
            'password' => bcrypt('administrator@popstop.space'),
            'first_name' => 'Вячеслав',
            'last_name' => 'Кутов',
            'patronymic' => 'Васильевич',
        ]);
        $admin->assignRole('Администратор');
        $user = User::create([
            'email' => 'employee@popstop.space',
            'password' => bcrypt('employee@popstop.space'),
            'first_name' => 'Сотрудник',
            'last_name' => 'Номер',
            'patronymic' => 'Один',
        ]);
        $user->assignRole('Сотрудник');
    }
}
