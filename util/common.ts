export const getPageDepth = (pathName: string): number => {
    return pathName.split('/').length - 1;
}

export const copyTextToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
};