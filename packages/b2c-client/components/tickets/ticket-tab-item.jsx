import React, { useMemo } from 'react';
import TicketItem from './ticket-item';
import { Spin } from 'antd';
import { currencyFormatter } from 'common/lib/utils';
import { useQuery } from 'common/hooks/useQuery';

const TicketTabItem = ({ eventId, isVip }) => {
    const { data, isLoading } = useQuery(
        `eventTikets?event_id=${eventId}&type=${isVip ? 0 : 1}`,
        {
            id: eventId,
        }
    );

    if (data?.length === 0) {
        return (
            <div className="flex justify-center text-xl font-medium text-slate-500">
                {isVip ? 'V.I.P' : 'Normal'} tickets is not available!
            </div>
        );
    }

    return (
        <Spin spinning={isLoading}>
            <>
                <div className="grid grid-cols-3 gap-8 2xl:grid-cols-4 ">
                    {data?.map((item) => (
                        <div className="col-span-1" key={item?.id}>
                            <TicketItem
                                type={item?.type}
                                area={item?.area}
                                ticketId={item?.id}
                                quantity={item?.quantity}
                            >
                                <div className="flex flex-col gap-1.5">
                                    <div className="text-xl font-semibold text-slate-600">
                                        {currencyFormatter(item?.price)}
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="font-semibold text-slate-500">
                                            {item?.name}
                                        </div>
                                        <div>-</div>
                                        <div className="text-slate-500">
                                            Area {item?.area}
                                        </div>
                                    </div>
                                    <div className="text-slate-500">
                                        <span className="text-sm">
                                            Number of tickets:{' '}
                                        </span>
                                        <span className="font-medium">
                                            {item?.quantity}
                                        </span>
                                    </div>
                                </div>
                            </TicketItem>
                        </div>
                    ))}
                </div>
            </>
        </Spin>
    );
};

export default TicketTabItem;
