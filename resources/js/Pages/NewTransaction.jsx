import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import Feed from '@/Components/Feed';
import { BiPlus } from 'react-icons/all'
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function NewTransaction(props) {
    const [ lastTransaction, setLastTransaction ] = useState();
    const [ balance, setBalance ] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        currency: '',
        debit: 0,
        vendor: '',
        lokasi: '',
        tipe: 1
    });

    const onHandleChange = (event) => {
        console.log(event)
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('addtransaction'));
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
                            
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <h2 className="font-extrabold text-2xl md:text-4xl">Add Transaction</h2>
                        <form onSubmit={()=>{e.preventDefault()}} className="flex flex-col gap-2">
                            <div className="">
                                <Label forInput={"name"} value={"Nama transaksi"} className="dark:text-white" />
                                <Input
                                    type='text'
                                    name='nama'
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                    handleChange={onHandleChange}
                                />
                            </div>
                            <div className="">
                                <Label forInput={"currency"} value={"Mata uang"} className="dark:text-white" />
                                <select className="rounded-lg dark:bg-slate-700" onChange={(e) => {setData("currency", e.currentTarget.value)}}>
                                    <option></option>
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
                                    handleChange={onHandleChange}
                                />
                            </div>
                            <div className="">
                                <Label forInput={"vendor"} value={"Vendor"} className="dark:text-white" />
                                <Input
                                    type='text'
                                    name='vendor'
                                    placeholder="Kodam, McDonald's, Cilok depan UPN"
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                    handleChange={onHandleChange}
                                />
                            </div>
                            <div className="">
                                <Label forInput={"lokasi"} value={"Lokasi"} className="dark:text-white" />
                                <Input
                                    type='text'
                                    name='lokasi'
                                    placeholder={`Surabaya, UPN "Veteran" Jawa Timur`}
                                    isFocused={true}
                                    className="dark:bg-slate-700 border-none"
                                    handleChange={onHandleChange}
                                />
                            </div>
                            
                            
                                
                            <div>
                                <Button type='submit' onClick={submit} children={"Simpan"} />
                            </div>
                                
                            
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
