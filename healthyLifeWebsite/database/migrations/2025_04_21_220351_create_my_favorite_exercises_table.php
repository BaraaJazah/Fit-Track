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
        Schema::create('my_favorite_exercises', function (Blueprint $table) {
            $table->id();

            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->foreignId('catagoryId')->references('id')->on('exercise_catagories')->cascadeOnDelete();
            $table->foreignId('exerciseId')->references('id')->on('exercises')->cascadeOnDelete();


            $table->string('EnName', 40);
            $table->string('ArName', 40)->nullable();
            $table->string('image');


            $table->integer('met')->nullable();

            $table->boolean('haveExplane')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_favorite_exercises');
    }
};
