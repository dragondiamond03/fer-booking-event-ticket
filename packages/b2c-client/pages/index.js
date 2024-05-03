import Container from '~/components/container';
import { cn } from 'common/lib/utils';
import { ListingCard } from '~/components/listings/listing-card';
import { useQuery } from 'common/hooks/useQuery';
import BannerSlider from '~/components/banner-slider';
import ListingRecommend from '~/components/listings/listing-recommend';
import { useMemo } from 'react';
import { List } from 'antd';

export default function Home() {
    const { data } = useQuery('events');

    const listEvent = useMemo(() => {
        return data?.reverse();
    }, [data]);

    return (
        <>
            <BannerSlider />
            <main className="py-20">
                <Container>
                    <div>
                        <ListingRecommend />
                    </div>
                    <div className="flex flex-col gap-4 pt-16">
                        <h2 className="text-2xl font-semibold">
                            All events available right now
                        </h2>
                        <div>
                            <List
                                pagination={{
                                    pageSize: 15,
                                    position: 'bottom',
                                    align: 'center',
                                }}
                                grid={{ gutter: 16, column: 5 }}
                                dataSource={listEvent}
                                renderItem={(item) => (
                                    <List.Item>
                                        <ListingCard data={item} />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </Container>
            </main>
        </>
    );
}
