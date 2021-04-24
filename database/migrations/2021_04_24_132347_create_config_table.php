<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigTable extends Migration
{
    public function up()
    {
        Schema::create('config', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->bigInteger('numeric_value')->nullable();
            $table->text('text_value')->nullable();
            $table->boolean('is_private')->default(0);
        });
    }

    public function down()
    {
        Schema::dropIfExists('config');
    }
}
