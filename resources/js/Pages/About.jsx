import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/inertia-react";

export default function About(props) {
    return (
        <Wrapper props={props}>
            <Head title="About" />
            <div className="min-h-screen flex flex-col z-0">
                <div className="flex flex-col gap-10 w-screen items-center justify-center px-10 h-screen bg-transparent">
                    <h1 className="text-center text-5xl md:text-7xl font-bold">Track your group spending</h1>
                    <p className="max-w-xl">
                        Casu allows you to find out how much you've spent with your friends. Never be wondering why you suddenly realized that you've spent more than you can chew.
                    </p>
                </div>
                <div className="flex flex-col gap-10 w-screen items-center justify-center px-10 h-screen bg-slate-300 dark:bg-slate-700">
                    <h1 className="text-center text-5xl md:text-7xl font-bold max-w-5xl">Find out who and what you spent the most at</h1>
                    <p className="max-w-xl">
                        
                    </p>
                </div>
            </div>
            <div className="flex items-center w-screen justify-center p-3 bg-slate-400 dark:bg-slate-800 text-sm">
                <p className="plus-jakarta-sans text-center text-white">Created with a cup of ☕, Laravel, Inertia.js, and ReactJS</p>
            </div>
        </Wrapper>
    )
}