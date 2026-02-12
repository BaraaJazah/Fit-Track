<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('my_calenders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->date('day');
            $table->integer('kcal');
            $table->integer('protein');
            $table->integer('fats');
            $table->integer('carbs');
            $table->integer('burn');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_calenders');
    }
};
