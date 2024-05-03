import React from 'react';
import Container from '../container';
import Link from 'next/link';
import {
    FacebookFilled,
    InstagramFilled,
    YoutubeFilled,
    TwitterOutlined,
    TikTokFilled,
} from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="border-t text-slate-500">
            <div className="border-b">
                <Container>
                    <div className="flex gap-4 py-4">
                        <Link
                            href="/"
                            className="hover:text-slate-500 hover:underline"
                        >
                            <p>About Us</p>
                        </Link>
                        <Link
                            href="/"
                            className="hover:text-slate-500 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/"
                            className="hover:text-slate-500 hover:underline"
                        >
                            Terms of Use
                        </Link>
                    </div>
                </Container>
            </div>
            <div className="py-4">
                <Container>
                    <div className="flex gap-4 border-b pb-4">
                        <div className="font-medium">
                            Hoang Minh Chinh, CEO of TicketBox Network Co.,Ltd
                        </div>
                        <div>|</div>
                        <div className="flex gap-4">
                            <p className="font-medium">
                                Business registration number
                            </p>
                            <p>202-81-45295 </p>
                        </div>
                        <div>|</div>
                        <div className="flex gap-4">
                            <p className="font-medium">
                                Mail order business report
                            </p>
                            <p>chinhhm@fpt.edu.vn</p>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Link
                            href="https://www.facebook.com"
                            passHref={true}
                            target="_blank"
                            className="hover:text-slate-500"
                        >
                            <FacebookFilled className="cursor-pointer text-4xl" />
                        </Link>
                        <Link
                            href="https://www.instagram.com"
                            passHref={true}
                            target="_blank"
                            className="hover:text-slate-500"
                        >
                            <InstagramFilled className="cursor-pointer text-4xl" />
                        </Link>
                        <Link
                            href="https://www.youtube.com"
                            passHref={true}
                            target="_blank"
                            className="hover:text-slate-500"
                        >
                            <YoutubeFilled className="cursor-pointer text-4xl" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            passHref={true}
                            target="_blank"
                            className="hover:text-slate-500"
                        >
                            <TwitterOutlined className="cursor-pointer text-4xl" />
                        </Link>
                        <Link
                            href="https://www.tiktok.com"
                            passHref={true}
                            target="_blank"
                            className="hover:text-slate-500"
                        >
                            <TikTokFilled className="cursor-pointer text-4xl" />
                        </Link>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
