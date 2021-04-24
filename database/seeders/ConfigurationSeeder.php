<?php

namespace Database\Seeders;

use App\Models\Configuration;
use Illuminate\Database\Seeder;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $values = collect([
            [
                'name' => 'recaptcha',
                'numeric_value' => null,
                'text_value' => '',
                'is_private' => 0
            ],
            [
                'name' => 'recaptcha_key',
                'numeric_value' => null,
                'text_value' => '',
                'is_private' => 0
            ],
            [
                'name' => 'recaptcha_secret',
                'numeric_value' => null,
                'text_value' => '',
                'is_private' => 0
            ],
            [
                'name' => 'show_user_menu',
                'numeric_value' => 1,
                'text_value' => null,
                'is_private' => 0
            ],
            [
                'name' => 'show_configuration_menu',
                'numeric_value' => 1,
                'text_value' => null,
                'is_private' => 0
            ],
        ]);
        $values->each(function($item) {
           Configuration::create($item);
        });
    }
}
