import { useAuth } from 'common/hooks/useAuth';
import { useQuery } from 'common/hooks/useQuery';
import React, { useMemo } from 'react';
import { List } from 'antd';
import NotificationBoxItem from './notificaltion-box-item';

const NotificationList = () => {
    const auth = useAuth('client');

    const { data, isLoading } = useQuery(`notifications?user_id=${auth?.id}`, {
        user_id: auth?.id,
    });

    const listNotification = useMemo(() => {
        return data?.sort(
            (a, b) =>
                new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
    }, [data]);

    return (
        <div>
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    pageSize: 5,
                    hideOnSinglePage: true,
                }}
                dataSource={listNotification}
                renderItem={(item) => (
                    <List.Item className="!p-0" key={item?.id}>
                        <NotificationBoxItem data={item} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationList;
