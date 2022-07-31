import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import Feed from '@/Components/Feed';
import { BiPlus } from 'react-icons/all'
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function NewTransaction(props) {
    const [ lastTransaction, setLastTransaction ] = useState();
    const [ balance, setBalance ] = useState(0);
    const [ tcode, setTcode ] = useState("LOADING");

    const generateRandomString = (myLength) => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const randomArray = Array.from(
          { length: myLength },
          (v, k) => chars[Math.floor(Math.random() * chars.length)]
        );
      
        const randomString = randomArray.join("");
        return randomString;
      };

    useEffect(() => {
        axios.get("/api/balance")
        .then((e) => {
            setBalance(e.data.balance)
        })
        .catch(console.error)

        axios.get("/api/transactions/overview")
        .then((e) => {
            setLastTransaction({
                debit: e.data.debit,
                currency: e.data.currency,
                name: e.data.nama
            })
        })
        .catch(console.error)

        setTcode(generateRandomString(8));
    }, [])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight">Transaksi</h2>}
        >
            <Head title="Add Transaction" />

            <div className="py-12 md:mx-0 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-xl">
                        <div className="bg-slate-300 dark:bg-slate-700 p-7 rounded-t-xl md:rounded-tr-none md:rounded-l-xl flex flex-col justify-between md:w-1/3">
                            <h2 className="font-bold">Saldo kas</h2>
                            <p className="text-3xl text-right">IDR {Intl.NumberFormat("id").format(balance)}</p>
                            <Link href={"/balance"} className="p-2 bg-slate-500 dark:bg-gray-600 bg-opacity-10 rounded-xl w-fit text-sm px-4" children={"Tambah saldo"} />
                        </div>
                        <div className="bg-zinc-400 dark:bg-zinc-800 p-7 flex flex-col justify-between md:w-1/3 gap-2">
                            <h2 className="font-bold">Transaksi terakhir</h2>
                            {
                                lastTransaction ?
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl text-right">{lastTransaction.name}</p>
                                    <span className="font-mono text-xs text-right">{lastTransaction.currency} {Intl.NumberFormat("id").format(lastTransaction.debit)}</span>
                                </div> : "Tidak ada transaksi"
                            }
                            <Link href={"/transactions"} className="p-2 bg-gray-100 bg-opacity-10 rounded-xl w-fit text-sm px-4" children={"Lihat riwayat transaksi"} />
                        </div>
                        <div className="bg-stone-300 dark:bg-slate-900 p-7 rounded-b-xl md:rounded-bl-none md:rounded-r-xl flex flex-col justify-between md:w-1/3">
                            <h2 className="font-bold">Coming soon</h2>
                            {/* <p className="text-3xl text-right">IDR 192.000,00</p> */}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <h2 className="font-extrabold text-2xl md:text-4xl">Add Transaction</h2>
                        <form onSubmit={()=>{}} className="flex flex-col gap-2">
                            <div className="">
                                <Label forInput={"name"} value={"Nama transaksi"} className="dark:text-white" />
                                <Input
                                    type='text'
                                    name='name'
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                />
                            </div>
                            <div className="">
                                <Label forInput={"currency"} value={"Mata uang"} className="dark:text-white" />
                                <select className="rounded-lg dark:bg-slate-700">
                                    <option value="IDR">IDR - Indonesian Rupiah</option>
                                </select>
                            </div>
                            <div className="">
                                <Label forInput={"debit"} value={"Nominal"} className="dark:text-white" />
                                <Input
                                    type='number'
                                    name='debit'
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                />
                            </div>
                            <div className="">
                                <Label forInput={"vendor"} value={"Vendor"} className="dark:text-white" />
                                <Input
                                    type='text'
                                    name='name'
                                    placeholder="Kodam, McDonald's, Cilok depan UPN"
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                />
                            </div>
                            <div className="">
                                <Label forInput={"lokasi"} value={"Lokasi"} className="dark:text-white" />
                                <Input
                                    type='text'
                                    name='name'
                                    placeholder={`Surabaya, UPN "Veteran" Jawa Timur`}
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                />
                            </div>
                            <div className="bg-slate-900 w-fit mt-3 rounded-lg">
                                <span className="bg-gradient-to-r from-fuchsia-800 to-purple-600 px-3 py-2 rounded-t-lg">Kode transaksi</span>
                                <p className="font-mono px-3 py-2 text-center text-xl">
                                    {tcode}
                                </p>
                            </div>
                            {
                                tcode && tcode !== "LOADING" ? 
                                <div>
                                    <Button type='submit' children={"Simpan"} />
                                </div>
                                : "Menunggu kode transaksi..."
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
