import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import * as request from '../../lib/httpRequest';
export const getListAdmin = async () => {
    try {
        const response = await request.get('admin');
        return response.data;
    } catch (error) {
        return error;
    }
};

export const loginAdmin = async (auth) => {
    let user;
    const response = await request.get(`admin?username=${auth.username}`);
    if (response?.data.length > 0) {
        user = response?.data?.[0];
    }
    if (!user) {
        return null;
    }
    const sign = await bcrypt.compare(auth?.password, user?.password);
    if (sign) {
        Cookies.set('accessToken', JSON.stringify(user), { expires: 7 });
        return user;
    }
};
