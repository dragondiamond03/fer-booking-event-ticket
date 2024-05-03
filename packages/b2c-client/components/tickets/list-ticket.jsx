import React from 'react';
import Tab from 'common/components/tab';
import TicketTabItem from './ticket-tab-item';

const ListTicket = ({ eventId }) => {
    const items = [
        {
            key: '1',
            label: 'V.I.P Tickets',
            children: (
                <main className="py-14">
                    <TicketTabItem eventId={eventId} isVip={true} />
                </main>
            ),
        },
        {
            key: '2',
            label: 'Normal Tickets',
            children: (
                <main className="py-14">
                    <TicketTabItem eventId={eventId} isVip={false} />
                </main>
            ),
        },
    ];

    return <Tab items={items} />;
};

export default ListTicket;
