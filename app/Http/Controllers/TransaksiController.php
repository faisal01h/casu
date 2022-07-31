<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaksi;
 
class TransaksiController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */

    public function getOverview() {
        $last = Transaksi::where('tipe', 1)->get();
        echo $last[count($last)-1];
    }

    public function getTransactions() {
        $trx = Transaksi::where('tipe', 1)->get();
        for($i = 0;  $i < count($trx); ++$i) {
            $aut = User::find($trx[$i]["author"]);
            $trx[$i]["author"] = $aut;
        }
        return json_encode($trx);
    }

    public function getBalance() {
        $bal = Transaksi::where('tipe', 1)->get();
        $ret = 0;
        for($i = 0; $i < count($bal); ++$i) {
            $ret += $bal[$i]["debit"];
        }
        return json_encode(array("balance"=>$ret));
    }

    public function show($id)
    {
        return Inertia::render('Dashboard');
    }
}