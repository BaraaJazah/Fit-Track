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
        Schema::create('explanes', function (Blueprint $table) {
            $table->id();
            $table->string('explaneFor', 20)->nullable(); // في حال نورمل منشان نعرف لمين الشرح
            $table->integer('activeId'); // have id of food or exercise or normal
            $table->enum('activeType', ['food', 'exercise', 'normal']);
            $table->string('EnTextFile'); // link
            $table->string('ArTextFile'); // link


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('explanes');
    }
};
