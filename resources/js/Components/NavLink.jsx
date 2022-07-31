import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children, className = "" }) {
    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-opacity-10 ${active ? 'font-semibold bg-gray-600 dark:bg-gray-800 bg-opacity-5':''} ${className}`}
        >
            {children}
        </Link>
    );
}

// <Link href="/" className="px-3 py-2 rounded-xl hover:bg-gray-100 hover:bg-opacity-10">Home</Link>