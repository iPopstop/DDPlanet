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
        for($i = 1; $i < 3; $i++) {
            $name = "administrator{$i}@popstop.space";
            $admin = User::create([
                'email' => $name,
                'password' => bcrypt($name),
                'first_name' => 'Администратор',
                'last_name' => 'Номер',
                'patronymic' => "#{$i}",
            ]);
            $admin->assignRole('Администратор');
        }

        for($i = 1; $i < 6; $i++) {
            $name = "employee{$i}@popstop.space";
            $user = User::create([
                'email' => $name,
                'password' => bcrypt($name),
                'first_name' => 'Сотрудник',
                'last_name' => 'Номер',
                'patronymic' => "#{$i}",
            ]);
            $user->assignRole('Сотрудник');
        }
    }
}
