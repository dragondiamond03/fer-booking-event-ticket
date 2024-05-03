import Image from 'next/image';
import { useQuery } from 'common/hooks/useQuery';
import React from 'react';
import { Rate } from 'antd';

const CommentItem = ({ data }) => {
    const { data: userData, isLoading } = useQuery(`users/${data?.user_id}`, {
        id: data?.user_id,
    });

    return (
        <div className="flex gap-4 py-4">
            <div>
                <Image
                    className="rounded-full object-cover"
                    src={userData?.avatar || '/images/placeholder.jpg'}
                    width={50}
                    height={50}
                    style={{
                        width: 50,
                        height: 50,
                    }}
                    alt=""
                />
            </div>
            <div>
                <div className="font-medium text-slate-600">
                    {userData?.name}
                </div>
                <div>
                    <Rate
                        className="text-sm"
                        defaultValue={data?.quality}
                        disabled
                    />
                </div>
                <div className="mt-2">{data?.comment}</div>
            </div>
        </div>
    );
};

export default CommentItem;
