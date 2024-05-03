export const encode = (str) => {
    const encodedString = Buffer.from(str?.toString() ?? '').toString('base64');
    return encodedString;
};

export const decode = (str) => {
    const decodedString = Buffer.from(str?.toString() ?? '', 'base64').toString(
        'utf-8'
    );
    return decodedString;
};

export const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
