import { ArrowUpOutlined } from '@ant-design/icons';
import { cn } from 'common/lib/utils';
import { useEffect, useState } from 'react';

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return window.addEventListener('scroll', toggleVisible);
    }, []);
    return (
        <div
            className={cn(
                'z-50 flex h-10 w-full items-center justify-end',
                !visible && 'hidden'
            )}
        >
            <div
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 bg-white shadow-md"
                onClick={scrollToTop}
            >
                <ArrowUpOutlined />
            </div>
        </div>
    );
}

export default ScrollToTopButton;
