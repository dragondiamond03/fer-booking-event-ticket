import React from 'react';
import { cn } from 'common/lib/utils';

const Container = ({ children }) => {
    return (
        <div
            className={cn(
                'mx-auto max-w-[2520px] px-4',
                'xl:px-20',
                'md:px-10',
                'sm:px-2'
            )}
        >
            {children}
        </div>
    );
};

export default Container;
