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
        Schema::create('my_exercise_exercises', function (Blueprint $table) {
            $table->id();

            $table->foreignId('myExerciseId')->references('id')->on('my_exercises')->cascadeOnDelete();
            $table->foreignId('exerciseId')->references('id')->on('exercises')->cascadeOnDelete();

            $table->string('name');
            $table->string('image');

            $table->integer('met');
            $table->boolean('haveExplane')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_exercise_exercises');
    }
};
