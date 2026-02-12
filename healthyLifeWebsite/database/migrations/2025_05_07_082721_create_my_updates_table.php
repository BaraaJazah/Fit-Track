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
        Schema::create('my_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->boolean('food')->default(0);
            $table->boolean('exercise')->default(0);
            $table->boolean('app')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_updates');
    }
};
