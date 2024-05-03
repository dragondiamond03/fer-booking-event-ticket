import { useEffect, useReducer } from 'react';

import {
    getProvinces,
    getDistrictsByProvince,
    getWardsByDistrict,
} from 'common/services/vnPublic';

const initialState = {
    isLoading: false,
    provinces: null,
    districts: null,
    wards: null,
    errors: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'PENDING':
            return { ...state, isLoading: true };
        case 'GET_PROVINCES_SUCCESS':
            return { ...state, isLoading: false, provinces: action.payload };
        case 'GET_DISTRICTS_SUCCESS':
            return { ...state, isLoading: false, districts: action.payload };
        case 'GET_WARDS_SUCCESS':
            return { ...state, isLoading: false, wards: action.payload };
        case 'ERRORS':
            return { ...state, isLoading: false, errors: action.payload };
    }
};

export const useVnApi = (provinceCodeSelected, districtCodeSelected) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const queryProvinces = async () => {
        dispatch({
            type: 'PENDING',
        });

        try {
            const response = await getProvinces();
            dispatch({
                type: 'GET_PROVINCES_SUCCESS',
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: 'ERRORS',
                payload: error,
            });
        }
    };

    const queryDistricts = async (provinceCode) => {
        dispatch({
            type: 'PENDING',
        });

        try {
            const response = await getDistrictsByProvince(provinceCode);

            dispatch({
                type: 'GET_DISTRICTS_SUCCESS',
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: 'ERRORS',
                payload: error,
            });
        }
    };

    const queryWards = async (districtCode) => {
        dispatch({
            type: 'PENDING',
        });

        try {
            const response = await getWardsByDistrict(districtCode);
            dispatch({
                type: 'GET_WARDS_SUCCESS',
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: 'ERRORS',
                payload: error,
            });
        }
    };

    useEffect(() => {
        queryProvinces();
    }, []);

    useEffect(() => {
        if (provinceCodeSelected) {
            queryDistricts(provinceCodeSelected);
        }
    }, [provinceCodeSelected]);

    useEffect(() => {
        if (districtCodeSelected) {
            queryWards(districtCodeSelected);
        }
    }, [districtCodeSelected]);

    return {
        ...state,
    };
};
