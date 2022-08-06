import React, { useEffect } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Wrapper from '@/Layouts/Wrapper';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome(props) {
    useEffect(() => {
        console.log(props)
    }, [])

    function greetings() {
        const dt = new Date().getHours();
        return dt > 2 && dt < 11 ? "pagi" : dt > 10 && dt < 15 ? "siang" : dt > 14 && dt < 18 ? "sore" : "malam"; 
    }

    return (
        <Wrapper className="text-center" props={props}>
            <Head title="Home" />
            <div className="flex w-screen items-center justify-center h-[50vh]">
                <ApplicationLogo fontSize={64} className="transition-all" />
            </div>
            {
                props.isAuth ?
                <div>
                    <h2 className="text-lg">Selamat {greetings()}, {props.auth.user.name.split(" ")[0]}!</h2>
                </div>
                : <div className="flex flex-col items-center gap-7">
                    <Link href="/register" className="text-white bg-gradient-to-r from-blue-500 to-teal-600 w-fit p-3 rounded-xl hover:ring dark:ring-white" children={"Register"} />
                </div>
            }
        </Wrapper>
    );
}
