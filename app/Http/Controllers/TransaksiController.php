<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
 
class TransaksiController extends Controller
{

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

    public function addTransaction(Request $request) {
        function randomString() {     
            $my_string = 'ABCDEFGHILJKLMNOPQRSTUVWXYZ0123456789';     
            $my_random_string = str_repeat($my_string, 10);     
            $my_random_string = str_shuffle($my_random_string);     
            $n = 8;     
            $my_random_string = substr($my_random_string,0,$n);     
            return $my_random_string; 
        }

        $request->validate([
            'nama' => 'required|string',
            'currency' => 'required|string',
            'debit' => 'required',
            'vendor' => 'required|string',
            'lokasi' => 'required|string',
            'tipe' => 'required',
        ]);

        $randomString = randomString();
        
        $trxAll = Transaksi::get();

        for($i = 0; $i < count($trxAll); ++$i) {
            if($randomString === $trxAll[$i]["transaction_code"]) {
                $randomString = randomString();
                $i = 0;
            }
        }

        if(floatval($request->debit) > 0) $request->debit = floatval($request->debit) * -1;

        $trx = Transaksi::create([
            'nama' => $request->nama,
            'currency' => $request->currency,
            'debit' => $request->debit,
            'vendor' => $request->vendor,
            'lokasi' => $request->lokasi,
            'tipe' => $request->tipe,
            'author' => Auth::id(),
            'transaction_code' => $randomString
        ]);
        return Inertia::render("Transactions");
    }

    public function removeTransactionApi(Request $request) {
        $request->validate([
            'transaction_code' => 'required|string',
        ]);
        $deleted = Transaksi::where('transaction_code', $request->transaction_code)->delete();
        return json_encode($deleted);
    }

    public function updateTransactionApi(Request $request) {
        $request->validate([
            'transaction_code' => 'required|string',
        ]);
        $trx = Transaksi::where('transaction_code', $request->transaction_code);
        $request->nama ? $trx->nama = $request->nama : false;
        $request->debit ? $trx->debit = $request->debit : false;
        $request->vendor ? $trx->vendor = $request->vendor : false;
        $request->lokasi ? $trx->lokasi = $request->lokasi : false;

        if($trx->isDirty()) {
            $trx->save();
            return json_encode(array(
                "message" => "OK"
            ));
        } else return json_encode(array(
            "message" => "No change was made"
        ));
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