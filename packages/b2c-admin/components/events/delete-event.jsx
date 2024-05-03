import React, { useEffect } from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { AlertButton } from 'common/components/alert-button';

const DeleteEvent = ({ id, successCallback }) => {
    const [trigger, { data, isLoading, error }] = useMutation();

    useEffect(() => {
        if (data) {
            toast.success('Delete event successfully!');
            setTimeout(() => {
                successCallback?.();
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.success('Delete event failed!');
        }
    }, [error]);

    const handleDeleteEvent = () => {
        trigger('DELETE', `events/${id}`);
    };

    return (
        <Tooltip title="Delete event" arrow={false} color="red">
            <AlertButton
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                message="Are you sure you want to delete this record?"
                onConfirm={handleDeleteEvent}
            />
        </Tooltip>
    );
};

export default DeleteEvent;
