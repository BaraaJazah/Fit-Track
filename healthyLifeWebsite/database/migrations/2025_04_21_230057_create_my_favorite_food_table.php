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
        Schema::create('my_favorite_food', function (Blueprint $table) {
            $table->id();



            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->foreignId('catagoryId')->references('id')->on('food_catagories')->cascadeOnDelete();
            $table->foreignId('foodId')->references('id')->on('food')->cascadeOnDelete();

            $table->string('EnName', 40);
            $table->string('ArName', 40)->nullable();

            $table->string('image');

            // name in other lang
            $table->integer('kcal');
            $table->integer('protein');
            $table->integer('fats');
            $table->integer('carbs');
            $table->boolean('haveExplane')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_favorite_food');
    }
};
