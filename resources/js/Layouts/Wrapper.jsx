import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';

export default function Wrapper({props, children, className = ""}) {
    return (
        
        <div className={"bg-slate-200 dark:bg-gray-900 min-h-screen dark:text-white "+className}>
            <Navbar hideLogo={window.location.pathname==="/" ? true:false} props={props} />
            {children}
        </div>
        
    );
}