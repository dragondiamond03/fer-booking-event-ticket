import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

const Page404 = () => {
    return (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-5">
            <div className="text-8xl font-extrabold text-slate-400">404</div>
            <div className="text-2xl font-medium">
                Sorry, we couldn&apos;t find this page.
            </div>
            <div>
                <Link href="/">
                    <Button type="primary" size="large">
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Page404;

Page404.getLayout = function getLayout(page) {
    return page;
};
