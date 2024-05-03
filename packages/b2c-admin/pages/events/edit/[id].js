import { Spin } from 'antd';
import { useQuery } from 'common/hooks/useQuery';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from '~/components/container';
import EventForm from '~/components/events/event-form';
import { Header } from '~/components/header';
import { toast } from 'react-toastify';
import { useMutation } from 'common/hooks/useMutation';
import { convertImageToBase64 } from 'common/lib/base64';

const EditEvent = () => {
    const { query, push } = useRouter();

    const { data, isLoading } = useQuery(`events/${query.id}`, {
        id: query?.id,
    });

    const [trigger, { isLoading: triggerLoading, data: editResData, error }] =
        useMutation();

    useEffect(() => {
        if (editResData) {
            toast.success('Edit event successfully!');
            setTimeout(() => {
                push('/');
            }, 500);
        }
    }, [editResData]);

    useEffect(() => {
        if (error) {
            toast.error('Create event failed!');
        }
    }, [error]);

    const onFinish = async (values) => {
        const submitObject = {
            ...values,
            image:
                typeof values.image?.[0] === 'string'
                    ? values.image
                    : [
                          await convertImageToBase64(
                              values?.image?.[0]?.originFileObj
                          ),
                      ],
        };
        trigger('PUT', `events/${query?.id}`, submitObject);
    };

    return (
        <Spin spinning={isLoading}>
            <Container>
                <Header title="Edit event" />
                <EventForm
                    initialValue={data}
                    action={onFinish}
                    isLoading={triggerLoading}
                />
            </Container>
        </Spin>
    );
};

export default EditEvent;
