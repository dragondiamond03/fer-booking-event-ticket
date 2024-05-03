import axios from 'axios';

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const get = async (path, req) => {
    const response = await request.get(path, req);
    return response;
};

export const post = async (path, req, headers) => {
    const response = await request.post(path, req, headers);
    return response;
};

export const put = async (path, req, headers) => {
    const response = await request.put(path, req, headers);
    return response;
};

export const patch = async (path, req, headers) => {
    const response = await request.patch(path, req, headers);
    return response;
};

export const remove = async (path) => {
    const response = await request.delete(path);
    return response;
};

export default request;
