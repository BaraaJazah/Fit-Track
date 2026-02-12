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
        Schema::create('my_dishes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->string('name', 20);

            // total of foods data
            $table->integer('kcal');
            $table->integer('protein');
            $table->integer('fats');
            $table->integer('carbs');

            $table->integer('totalQuantity'); // عدد الحصص
            $table->integer('serving'); // عدد الحصص

            $table->integer('foodType'); //

            $table->string('explane', 2000)->nullable(); //

            $table->string('iconName');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_dishes');
    }
};
