import React from 'react';

export default function ApplicationLogo({ fontSize = 24, className = '' }) {
    return (
        <h1 className={`font-extrabold dark:text-white text-black select-none ${className}`} style={{fontSize}}>
            Casu 🐶
        </h1>
    );
}
