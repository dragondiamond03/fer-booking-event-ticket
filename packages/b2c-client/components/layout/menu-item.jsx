import React from 'react';
import { cn } from 'common/lib/utils';

const MenuItem = ({ label, onClick, className }) => {
    return (
        <div
            className={cn(
                'select-none px-4 py-3 font-semibold transition hover:bg-neutral-100',
                className
            )}
            onClick={onClick}
        >
            {label}
        </div>
    );
};

export default MenuItem;
