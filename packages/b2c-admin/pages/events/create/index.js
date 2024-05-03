import React, { useEffect } from 'react';
import Container from '~/components/container';
import EventForm from '~/components/events/event-form';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { convertImageToBase64 } from 'common/lib/base64';
import { useRouter } from 'next/router';
import { Header } from '~/components/header';
import TicketForm from '~/components/Ticket/ticket-form';

const CreateEvent = () => {
    const router = useRouter();
    const [trigger, { isLoading, data: createResData, error }] = useMutation();

    useEffect(() => {
        if (createResData) {
            toast.success('Create event successfully!');
            setTimeout(() => {
                router.push(`/`);
            }, 200);
        }
    }, [createResData]);

    useEffect(() => {
        if (error) {
            toast.error('Create event failed!');
        }
    }, [error]);

    const onFinish = async (values) => {
        const submitObject = {
            ...values,
            image: [
                await convertImageToBase64(values?.image?.[0]?.originFileObj),
            ],
            eventTime: [
                values?.eventTime?.[0]?.format('YYYY-MM-DD HH:mm'),
                values?.eventTime?.[1]?.format('YYYY-MM-DD HH:mm'),
            ],
            bigEvent: values?.bigEvent ? true : false,
        };

        trigger('POST', 'events', submitObject);
    };

    return (
        <Container>
            <Header title="Create event" />
            <EventForm action={onFinish} isLoading={isLoading} />
        </Container>
    );
};

export default CreateEvent;
