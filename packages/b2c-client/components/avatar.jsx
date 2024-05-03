import Image from 'next/image';
import React from 'react';

const Avatar = ({ src }) => {
    return (
        <Image
            src={src || '/images/placeholder.jpg'}
            alt="avatar"
            className="rounded-full object-cover"
            style={{
                width: 70,
                height: 70,
            }}
        />
    );
};

export default Avatar;
