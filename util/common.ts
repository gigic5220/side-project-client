export const getPageDepth = (pathName: string): number => {
    return pathName.split('/').length - 1;
}

export const copyTextToClipboard = async (text: string, callback: () => void) => {
    await navigator.clipboard.writeText(text);
    callback()
};