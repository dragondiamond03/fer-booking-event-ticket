import React from 'react';
import MyPageHeader from '~/components/my-page/my-page-header';
import NotificationList from '~/components/my-page/notification-list';

const NotificationBox = () => {
    return (
        <div>
            <MyPageHeader title="Notification" />
            <NotificationList />
        </div>
    );
};

export default NotificationBox;
