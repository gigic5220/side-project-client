export const getPageDepth = (pathName: string): number => {
    return pathName.split('/').length - 1;
}