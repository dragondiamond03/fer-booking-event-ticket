import { provinces, districts, wards } from '../../constant/vn-api';

export const getProvinces = async () => {
    return provinces.data.data;
};

export const getDistrictsByProvince = async (provinceCode) => {
    const listDistrict = districts.data.data.filter(
        (item) => item.parent_code == provinceCode
    );

    return listDistrict;
};

export const getWardsByDistrict = async (districtCode) => {
    const listWard = wards.data.data.filter(
        (item) => item.parent_code === districtCode
    );

    return listWard;
};
