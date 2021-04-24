<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('fio');
            $table->string('phone');
            $table->text('message');
            $table->enum('status', ['Новое', 'Завершено', 'В работе'])->default('Новое');
            $table->foreignId('user_id')->index()->nullable()->constrained('users');
            $table->text('reason')->nullable();
            $table->foreignId('closed_by')->index()->nullable()->constrained('users');
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
}