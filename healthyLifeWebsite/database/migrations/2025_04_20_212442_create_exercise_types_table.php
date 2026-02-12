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
        Schema::create('exercise_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catagoryId')->references('id')->on('exercise_catagories')->cascadeOnDelete();
            $table->string('EnName', 20);
            $table->string('ArName', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_types');
    }
};
