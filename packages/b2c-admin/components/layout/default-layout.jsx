import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="max-h-[calc(100vh_-_56px)] flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </>
    );
};

export default DefaultLayout;
