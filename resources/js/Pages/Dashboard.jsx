import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import Feed from '@/Components/Feed';
import { BiPlus } from 'react-icons/all';
import { month, getStNdRdTh, day, twoDigits } from '@/Utils/functions';

export default function Dashboard(props) {
    const [ lastTransaction, setLastTransaction ] = useState();
    const [ balance, setBalance ] = useState(0);
    const [ transactions, setTransactions ] = useState([]);
    const [ feed, setFeed ] = useState([]);

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

        axios.get("/api/transactions")
        .then((e) => {
            setTransactions(e.data);
        })
        .catch(console.error)

    }, [])

    useEffect(() => {
        let fd = feed.concat(transactions)
        fd.sort((a, b) => {
            return a.created_at > b.created_at ? 1 : -1;
        })
        .reverse()
        setFeed(fd);
        console.log(fd)
    }, [transactions])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

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
                    
                    <div className="flex flex-row gap-2">
                        <Link href="/transaction/new" className="w-1/3 flex flex-col items-center justify-center text-center bg-blue-600 dark:bg-indigo-700 p-5 text-white rounded-xl">
                            <BiPlus className="border-2 border-white rounded" />
                            <span className="plus-jakarta-sans">Tambah transaksi</span>
                        </Link>
                        <Link href="#" className="w-1/3 flex flex-col items-center bg-slate-200 dark:bg-slate-700 p-5 text-white rounded-xl">
                            
                        </Link>
                        <Link href="#" className="w-1/3 flex flex-col items-center bg-slate-200 dark:bg-slate-700 p-5 text-white rounded-xl">
                            
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="font-extrabold text-2xl md:text-4xl">Feed</h2>
                        <div className="flex flex-col gap-2">
                            {
                                feed && feed.length > 0 ?
                                feed.map((e, i) => {
                                    let time = new Date(e.created_at)
                                    let time_str = `${time.getDate()} ${month.id[time.getMonth()]} ${time.getFullYear()} pukul ${twoDigits(time, 'hours')}.${twoDigits(time, 'minutes')}`
                                    
                                    if(e.transaction_code)
                                        return <Feed key={i} author={e.author.name} authorid={e.author.id} time={time_str} children={`Melakukan transaksi ${e.nama} di ${e.vendor} ${e.lokasi}`} type={"text"} />
                                    else return null
                                }) : null
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </Authenticated>
    );
}
