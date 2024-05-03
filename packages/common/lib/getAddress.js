import { provinces, districts, wards } from '../constant/vn-api';

export const getProvince = (id) => {
    const province = provinces.data.data.filter((item) => item._id === id);

    return province?.[0] || '';
};

export const getDistrict = (id) => {
    const district = districts.data.data.filter((item) => item._id === id);

    return district?.[0] || '';
};

export const getWard = (id) => {
    const ward = wards.data.data.filter((item) => item._id === id);

    return ward?.[0] || '';
};
