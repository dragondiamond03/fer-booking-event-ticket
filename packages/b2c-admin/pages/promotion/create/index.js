import React, { useEffect } from 'react';
import Container from '~/components/container';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { convertImageToBase64 } from 'common/lib/base64';
import { useRouter } from 'next/router';
import { Header } from '~/components/header';
import PromotionForm from '~/components/promontion/promotion-form';

const CreateEvent = () => {
    const router = useRouter();
    const [trigger, { isLoading, data: createResData, error }] = useMutation();

    useEffect(() => {
        if (createResData) {
            toast.success('Create promotion successfully!');
            setTimeout(() => {
                router.push(`/promotion`);
            }, 200);
        }
    }, [createResData]);

    useEffect(() => {
        if (error) {
            toast.error('Create promotion failed!');
        }
    }, [error]);

    const onFinish = async (values) => {
        const submitObject = {
            ...values,
            thumbnail: [
                await convertImageToBase64(
                    values?.thumbnail?.[0]?.originFileObj
                ),
            ],
        };

        trigger('POST', 'promotions', submitObject);
    };

    return (
        <Container>
            <Header title="Create promotion event" />
            <PromotionForm action={onFinish} isLoading={isLoading} />
        </Container>
    );
};

export default CreateEvent;
