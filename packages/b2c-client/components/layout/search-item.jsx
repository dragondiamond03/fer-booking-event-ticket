import Image from 'next/image';
import React from 'react';
import { cn } from 'common/lib/utils';

const SearchItem = ({ name, onClick, className, image }) => {
    return (
        <div
            className={cn(
                'select-none px-4 py-3 font-semibold transition hover:bg-neutral-100',
                className
            )}
            onClick={onClick}
        >
            <div className="flex gap-2">
                <Image
                    src={image}
                    alt={name}
                    width={24}
                    height={24}
                    className="rounded-md object-cover"
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
                <p>{name}</p>
            </div>
        </div>
    );
};

export default SearchItem;
