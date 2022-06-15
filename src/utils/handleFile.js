export const convertB64toBlob = async (base64String) => (await fetch(base64String)).blob();
