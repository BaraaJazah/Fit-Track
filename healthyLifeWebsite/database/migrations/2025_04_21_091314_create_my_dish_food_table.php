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
        Schema::create('my_dish_food', function (Blueprint $table) {
            $table->id();
            $table->foreignId('myDishId')->references('id')->on('my_dishes')->cascadeOnDelete();
            $table->foreignId('foodId')->references('id')->on('food')->cascadeOnDelete();
            $table->string('EnName');
            $table->string('ArName');
            $table->string('image');

            $table->integer('kcal');
            $table->integer('protein');
            $table->integer('fats');
            $table->integer('carbs');
            $table->integer('quantity');
            $table->boolean('haveExplane')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_dish_food');
    }
};
