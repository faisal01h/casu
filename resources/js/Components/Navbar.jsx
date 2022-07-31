import ApplicationLogo from "./ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import { BiLogOut, BiMenu, BiX } from 'react-icons/all';
import Button from "./Button";
import { Inertia } from "@inertiajs/inertia";

export default function Navbar({props, hideLogo = false}) {
    const [ showNav, setShowNav ] = useState(false);
    useEffect(() => {
        
    }, [])
    const links = [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'About',
            href: '/about'
        }
    ]

    return (
        <div className="flex flex-row px-7 py-5 items-center justify-between dark:text-white">
            {hideLogo !== true ? <Link href="/" children={<ApplicationLogo fontSize={26} />} className="transition-all" /> : <div></div>}

            <div className="hidden md:flex flex-row gap-2">
                {
                    links.map((e, i) => {
                        return <NavLink key={i} href={e.href} children={e.text} active={e.href===window.location.pathname?true:false} />
                    })
                }
                {
                    props && props.isAuth ? 
                    <div className="flex flex-row gap-2">
                        <NavLink href="/dashboard" className="bg-gradient-to-r from-violet-900 to-fuchsia-600 hover:ring-2 hover:dark:ring-white hover:ring-black transition-all text-white" children={"Dashboard"} />
                        <Button onClick={() => {Inertia.visit("/logout", {method:"post"})}} className=" transition-all flex items-center hover:bg-opacity-10 hover:bg-gray-700 dark:hover:bg-gray-700 rounded-xl hover:text-rose-600">
                            <BiLogOut />
                        </Button>
                    </div>
                    : <NavLink href="/login" className="bg-gradient-to-r from-violet-900 to-fuchsia-600 hover:ring-2 hover:dark:ring-white hover:ring-black transition-all" children={"Login"} />
                }
            </div>

            <div className="flex flex-col items-end md:hidden">
                <button onClick={()=>{setShowNav(!showNav)}} className="p-3 text-lg bg-slate-700 bg-opacity-10 rounded">
                    {showNav ? <BiX />:<BiMenu />}
                </button>
                {
                    showNav ?
                    <div className="flex flex-col gap-2 w-64 absolute top-16 bg-slate-800 px-2 py-2 rounded-lg">
                        {
                            links.map((e, i) => {
                                return <NavLink key={i} href={e.href} children={e.text} active={e.href===window.location.pathname?true:false} />
                            })
                        }
                        {
                            props && props.isAuth ? 
                            <div className="flex flex-col gap-2">
                                <NavLink href="/dashboard" className="bg-gradient-to-r from-violet-900 to-fuchsia-600 hover:ring-2 hover:dark:ring-white hover:ring-black transition-all text-white" children={"Dashboard"} />
                                <Button onClick={() => {Inertia.visit("/logout", {method:"post"})}} className=" transition-all flex items-center gap-2 justify-center hover:bg-opacity-10 hover:bg-gray-100 rounded-xl hover:text-rose-600">
                                    <BiLogOut /> Logout
                                </Button>
                            </div>
                            : <NavLink href="/login" className="bg-gradient-to-r from-violet-900 to-fuchsia-600 hover:ring-2 hover:dark:ring-white hover:ring-black transition-all" children={"Login"} />
                        }
                    </div> : null
                }
            </div>
        </div>
    )
}