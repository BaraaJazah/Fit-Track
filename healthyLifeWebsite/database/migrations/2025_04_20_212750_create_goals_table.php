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
        Schema::create('goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->integer('height');
            $table->integer('weight');
            $table->integer('age');
            $table->enum('gender', ['male', 'female']);
            $table->enum('activeState', ['lowActivity', 'normalActivity', 'highActivity']);
            $table->integer('kcal');
            $table->integer('protein');
            $table->integer('fats');
            $table->integer('carbs');
            $table->string('GeneralGoal');  // less 1kg , less 0.5kg ,win ...
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};
