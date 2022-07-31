import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                <div className="font-medium text-red-600">We can't verify your credentials due to the following errors.</div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {Object.keys(errors).map(function (key, index) {
                        return <span className="flex gap-1 items-center" key={index}> <VscChromeClose /> {errors[key]}</span>;
                    })}
                </ul>
            </div>
        )
    );
}
