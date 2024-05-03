export const getType = (id, list) => {
    const type = list?.filter((item) => item.id === id);

    return type?.[0]?.name || '';
};

export const getValueByObjKey = (id, list, key) => {
    const type = list?.filter((item) => item.id === id);

    return type?.[0]?.[key] || '';
};
