import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            alt="logo"
            className="cursor-pointer"
            height={40}
            onClick={() => router.push('/')}
            src="/images/logo.png"
            width={40}
        />
    );
};

export default Logo;
