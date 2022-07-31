import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/inertia-react";

export default function About(props) {
    return (
        <Wrapper props={props}>
            <Head title="About" />
            <div className="min-h-screen">
                <div className="flex flex-col gap-2 w-screen pt-32 items-center justify-center">
                    <h1 className="text-center text-5xl md:text-7xl font-bold">Sekumpulan bocah asu</h1>
                    <h1>😉</h1>
                </div>
            </div>
            <div className="flex items-center w-screen justify-center p-3 bg-slate-800 text-sm">
                <p className="plus-jakarta-sans text-center">Created with a cup of ☕, Laravel, Inertia.js, and ReactJS</p>
            </div>
        </Wrapper>
    )
}