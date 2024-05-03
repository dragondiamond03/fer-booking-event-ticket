import { useEffect, useReducer } from 'react';
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

export const useQuery = (endpointURL, skip) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const trigger = async (url) => {
        dispatch({
            type: 'API_LOADING',
        });
        try {
            const response = await request.get(url);
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

    const reload = () => {
        trigger(endpointURL);
    };

    function hasOneNullValue(obj) {
        // Check if the object is empty
        if (Object.keys(obj).length === 0) {
            return false; // Empty object doesn't have null values
        }

        // Use some() to check if at least one value is null
        return Object.values(obj).some((value) => !value);
    }

    useEffect(() => {
        if (skip) {
            if (!hasOneNullValue(skip)) {
                trigger(endpointURL);
            }
        } else {
            trigger(endpointURL);
        }
    }, [endpointURL]);

    return { ...state, reload };
};
