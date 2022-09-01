<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->insert([
            'name' => "Admin",
            'email' => 'admin@gmail.com',
            'password' => '1234567',
        ]);

        \DB::table('users')->insert([
            'name' => "Admin2",
            'email' => 'admin2@gmail.com',
            'password' => '1234567',
        ]);
    }
}
