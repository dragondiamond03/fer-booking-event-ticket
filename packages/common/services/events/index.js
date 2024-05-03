import * as request from '~/lib/httpRequest';

export const getListEventType = async () => {
    try {
        const response = await request.get('eventType');
        return response.data;
    } catch (error) {
        return error;
    }
};
