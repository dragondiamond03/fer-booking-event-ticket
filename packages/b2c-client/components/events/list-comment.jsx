import { useQuery } from 'common/hooks/useQuery';
import React, { useEffect, useMemo, useState } from 'react';
import { List, Spin } from 'antd';
import CommentItem from './comment-item';
import { cn } from 'common/lib/utils';

const RateSelect = ({ title, onClick, selected, className }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex h-[32px] w-[100px] cursor-pointer items-center justify-center bg-white text-center',
                selected ? 'border border-rose-500 text-rose-500' : 'border',
                className
            )}
        >
            {title}
        </div>
    );
};

const ListComment = ({ eventId }) => {
    const [rateFilter, setRateFilter] = useState('');

    const { data, isLoading } = useQuery(
        `comments?event_id=${eventId}&quality=${rateFilter}`,
        {
            id: eventId,
        }
    );

    const listComment = useMemo(() => {
        return data?.sort(
            (a, b) =>
                new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
    }, [data]);

    const handleChangeFilter = (value) => {
        setRateFilter(value);
    };

    return (
        <Spin spinning={isLoading}>
            <div className="flex flex-col gap-6">
                <div className="text-lg font-medium">Event Ratings</div>
                <div className="flex gap-2 border bg-neutral-50 p-6">
                    <RateSelect
                        title="All"
                        selected={rateFilter === ''}
                        onClick={() => handleChangeFilter('')}
                    />
                    <RateSelect
                        title="5 Star"
                        selected={rateFilter === '5'}
                        onClick={() => handleChangeFilter('5')}
                    />
                    <RateSelect
                        title="4 Star"
                        selected={rateFilter === '4'}
                        onClick={() => handleChangeFilter('4')}
                    />
                    <RateSelect
                        title="3 Star"
                        selected={rateFilter === '3'}
                        onClick={() => handleChangeFilter('3')}
                    />
                    <RateSelect
                        title="2 Star"
                        selected={rateFilter === '2'}
                        onClick={() => handleChangeFilter('2')}
                    />
                    <RateSelect
                        title="1 Star"
                        selected={rateFilter === '1'}
                        onClick={() => handleChangeFilter('1')}
                    />
                </div>
                <List
                    pagination={{
                        position: 'bottom',
                        align: 'center',
                        pageSize: 5,
                        hideOnSinglePage: true,
                    }}
                    dataSource={listComment}
                    renderItem={(item) => (
                        <List.Item className="!p-0" key={item?.id}>
                            <CommentItem data={item} />
                        </List.Item>
                    )}
                />
            </div>
        </Spin>
    );
};

export default ListComment;
