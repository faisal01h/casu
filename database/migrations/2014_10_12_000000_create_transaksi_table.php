<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('currency');
            $table->double('debit', 16, 2);
            $table->string('vendor');
            $table->string('lokasi');
            $table->string('lok_coord_lon')->nullable();
            $table->string('lok_coord_lat')->nullable();
            $table->unsignedInteger('tipe');
            $table->unsignedInteger('author');
            $table->string('transaction_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaksi');
    }
};
