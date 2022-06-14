export const convertB64toBlob = async (base64String) => {
    return (await fetch(base64String)).blob()
}
