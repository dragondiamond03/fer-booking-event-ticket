import React, { useEffect } from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { AlertButton } from 'common/components/alert-button';

const DeletePromotion = ({ id, successCallback }) => {
    const [trigger, { data, isLoading, error }] = useMutation();

    useEffect(() => {
        if (data) {
            toast.success('Delete promotion successfully!');
            setTimeout(() => {
                successCallback?.();
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.success('Delete promotion failed!');
        }
    }, [error]);

    const handleDeletePromotion = () => {
        trigger('DELETE', `promotions/${id}`);
    };

    return (
        <Tooltip title="Delete promotion" arrow={false} color="red">
            <AlertButton
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                message="Are you sure you want to delete this record?"
                onConfirm={handleDeletePromotion}
            />
        </Tooltip>
    );
};

export default DeletePromotion;
