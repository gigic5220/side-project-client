export const getPageDepth = (pathName: string): number => {
    return pathName.split('/').length - 1;
}

export const copyTextToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
};

export const convertObjectToQueryString = (params: Record<string, any>) => {
    return Object.keys(params).map(key => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(params[key]);
        return `${encodedKey}=${encodedValue}`;
    }).join('&');
}