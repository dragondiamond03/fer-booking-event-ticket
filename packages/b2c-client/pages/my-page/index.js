import React from 'react';
import ListingRecommend from '~/components/listings/listing-recommend';
import UserProfile from '~/components/my-page/user-profile';

const MyPage = () => {
    return (
        <div>
            <UserProfile />
            <div className="py-24">
                <ListingRecommend />
            </div>
        </div>
    );
};

export default MyPage;
