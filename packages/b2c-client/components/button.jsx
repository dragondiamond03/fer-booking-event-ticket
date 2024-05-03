import React from 'react';
import { cn } from 'common/lib/utils';

const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
    return (
        <button
            className={cn(
                'relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
                outline
                    ? 'border-black bg-white text-black'
                    : 'border-rose-500 bg-rose-500 text-white',
                small
                    ? 'border-[1px] py-1 text-sm font-light'
                    : 'border-2 py-3 font-semibold'
            )}
            disabled={disabled}
            onClick={onClick}
            type="button"
        >
            {Icon && <Icon className="absolute left-4 top-3" size={24} />}
            {label}
        </button>
    );
};

export default Button;
