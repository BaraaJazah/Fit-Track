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
        Schema::create('user_subscribes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->references('id')->on('users')->cascadeOnDelete();
            $table->integer('premier')->default(0);
            $table->date('premierEndDate')->nullable();
            $table->integer('limitDish')->default(3);
            $table->integer('limitAI')->default(20);
            $table->integer('myDish')->default(0);
            $table->integer('myAI')->default(0);
            $table->boolean('makeReview')->default(0);
            $table->boolean('referralCode')->default(0);
            $table->string('myReferralCode');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_subscribes');
    }
};
