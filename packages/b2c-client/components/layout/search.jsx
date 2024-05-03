import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
    SearchOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useRouter } from 'next/router';
import SearchItem from './search-item';
import useLoginModal from '~/hooks/useLoginModal';
import { useAuth } from 'common/hooks/useAuth';
import { useDebounce } from 'common/hooks/useDebounce';

const Search = () => {
    const router = useRouter();

    const auth = useAuth('client');

    const { data, isLoading } = useQuery('events');

    const { onOpen } = useLoginModal();

    const searchRef = useRef(null);
    const searchInputRef = useRef(null);

    const [searchFocus, setSearchFocus] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const searchValueDebounce = useDebounce(searchValue);

    const handleClickOutSide = (e) => {
        if (!searchRef.current?.contains(e.target)) {
            setSearchFocus(false);
        }
        if (searchRef.current?.contains(e.target)) {
            setSearchFocus(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
    }, [searchRef]);

    const searchData = useMemo(() => {
        const res = data?.filter((item) =>
            item?.name?.toLowerCase().includes(searchValueDebounce || null)
        );
        return res;
    }, [data, searchValueDebounce]);

    const icon = useMemo(() => {
        if (isLoading) {
            return <LoadingOutlined />;
        }
        if (searchValue) {
            return (
                <CloseCircleOutlined
                    className="cursor-pointer"
                    onClick={() => {
                        setSearchValue('');
                    }}
                    style={{
                        fontSize: '12px',
                    }}
                />
            );
        }
        return <SearchOutlined />;
    }, [isLoading, searchValue]);

    return (
        <div className="relative" ref={searchRef}>
            <div
                className="flex rounded-full border px-4 py-1.5 text-slate-500"
                onClick={() => {
                    searchInputRef.current?.focus();
                }}
            >
                <input
                    ref={searchInputRef}
                    className="z-10 w-56 border-none caret-rose-500 outline-none"
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                <div className="flex w-4 items-center justify-center">
                    {icon}
                </div>
            </div>
            {searchFocus && (
                <div className="absolute top-12 z-50 w-full overflow-auto rounded-lg bg-white shadow-lg">
                    {searchData?.map((item) => (
                        <SearchItem
                            key={item?.id}
                            name={item?.name}
                            image={item?.image?.[0]}
                            className="cursor-pointer"
                            onClick={() => {
                                if (!auth) {
                                    onOpen();
                                } else {
                                    router.push(`/events/${item?.id}`);
                                }
                                setSearchFocus(false);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
