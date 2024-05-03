import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import ScrollToTopButton from '../scroll-to-top-button';

const DefaultLayout = ({ children }) => {
    return (
        <main className="min-w-[1200px]">
            <Navbar />
            <div>{children}</div>
            <Footer />
            <div className="fixed bottom-5 right-5 cursor-pointer">
                <ScrollToTopButton />
            </div>
        </main>
    );
};

export default DefaultLayout;
