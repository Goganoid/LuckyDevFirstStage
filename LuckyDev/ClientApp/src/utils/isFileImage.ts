export function isFileImage(file:File) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
 
    return file && acceptedImageTypes.includes(file['type'])
}