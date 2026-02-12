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
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->foreignId('typeId')->references('id')->on('food_types')->cascadeOnDelete();
            $table->string('EnName', 40);
            $table->string('ArName', 40)->nullable();

            $table->string('image');

            // name in other lang
            $table->float('kcal');
            $table->float('protein');
            $table->float('fats');
            $table->float('carbs');
            $table->boolean('haveExplane')->default(0);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food');
    }
};
