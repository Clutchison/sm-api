export const objectIsEmpty = (obj: {[key: string]: any}): boolean => {
    console.log(obj);
    return Object.keys(obj).filter(k => !!obj[k]).length > 0;
}
