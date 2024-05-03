import { useReducer } from 'react';
import * as request from '../lib/httpRequest';

const INITIAL_STATE = {
    isLoading: false,
    data: null,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'API_LOADING':
            return { ...state, isLoading: true };
        case 'API_SUCCESS':
            return { ...state, isLoading: false, data: action.payload };
        case 'API_FAILED':
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const useMutation = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const postApi = async (endpointURL, body) => {
        dispatch({
            type: 'API_LOADING',
        });
        try {
            const response = await request.post(endpointURL, body);
            dispatch({
                type: 'API_SUCCESS',
                payload: response?.data,
            });
        } catch (error) {
            dispatch({
                type: 'API_FAILED',
                payload: 'Something when wrong. Please try again!',
            });
        }
    };

    const putApi = async (endpointURL, body) => {
        dispatch({
            type: 'API_LOADING',
        });
        try {
            const response = await request.put(endpointURL, body);
            dispatch({
                type: 'API_SUCCESS',
                payload: response?.data,
            });
        } catch (error) {
            dispatch({
                type: 'API_FAILED',
                payload: 'Something when wrong. Please try again!',
            });
        }
    };

    const patchApi = async (endpointURL, body) => {
        dispatch({
            type: 'API_LOADING',
        });
        try {
            const response = await request.patch(endpointURL, body);
            dispatch({
                type: 'API_SUCCESS',
                payload: response?.data,
            });
        } catch (error) {
            dispatch({
                type: 'API_FAILED',
                payload: 'Something when wrong. Please try again!',
            });
        }
    };

    const deleteApi = async (endpointURL) => {
        dispatch({
            type: 'API_LOADING',
        });
        try {
            const response = await request.remove(endpointURL);
            dispatch({
                type: 'API_SUCCESS',
                payload: response?.data,
            });
        } catch (error) {
            dispatch({
                type: 'API_FAILED',
                payload: 'Something when wrong. Please try again!',
            });
        }
    };

    const trigger = async (method, endpointURL, body) => {
        switch (method) {
            case 'POST':
                return postApi(endpointURL, body);
            case 'PUT':
                return putApi(endpointURL, body);
            case 'PATCH':
                return patchApi(endpointURL, body);
            case 'DELETE':
                return deleteApi(endpointURL);
            default:
                return () => {};
        }
    };

    return [trigger, state];
};
