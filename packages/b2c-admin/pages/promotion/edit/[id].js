import { Spin } from 'antd';
import { useQuery } from 'common/hooks/useQuery';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from '~/components/container';
import { Header } from '~/components/header';
import { toast } from 'react-toastify';
import { useMutation } from 'common/hooks/useMutation';
import { convertImageToBase64 } from 'common/lib/base64';
import PromotionForm from '~/components/promontion/promotion-form';

const EditPromotion = () => {
    const { query, push } = useRouter();

    const { data, isLoading } = useQuery(`promotions/${query.id}`, {
        id: query?.id,
    });

    const [trigger, { isLoading: triggerLoading, data: editResData, error }] =
        useMutation();

    useEffect(() => {
        if (editResData) {
            toast.success('Edit promotion successfully!');
            setTimeout(() => {
                push('/promotion');
            }, 500);
        }
    }, [editResData]);

    useEffect(() => {
        if (error) {
            toast.error('Edit promotion failed!');
        }
    }, [error]);

    const onFinish = async (values) => {
        const submitObject = {
            ...values,
            thumbnail:
                typeof values.thumbnail?.[0] === 'string'
                    ? values.thumbnail
                    : [
                          await convertImageToBase64(
                              values?.thumbnail?.[0]?.originFileObj
                          ),
                      ],
        };
        trigger('PUT', `promotions/${query?.id}`, submitObject);
    };

    return (
        <Spin spinning={isLoading}>
            <Container>
                <Header title="Edit promotion" />
                <PromotionForm
                    initialValue={data}
                    action={onFinish}
                    isLoading={triggerLoading}
                />
            </Container>
        </Spin>
    );
};

export default EditPromotion;
