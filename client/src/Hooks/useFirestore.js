import { useEffect, useState } from 'react';
import { galleryStorage, galleryFireStore, timestamp } from '../Firebase/config';

const useFirestore = (image) => {

    const [progress, setProgress] = useState(0);
    const [imageUploadeError, setImageUploadError] = useState('')
    const [URL, setUrl] = useState('');

    useEffect(() => {
        const uploadImage = async () => {
            const storeageRef = galleryStorage.ref();
            const collectionRef = galleryFireStore.collection('images');
            const fileRef = storeageRef.child(image.name);
            fileRef.put(image).on('Uploading_image', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage)
            }, err => {
                setProgress(100)
                setImageUploadError(err)
            },
                async () => {
                    const url = await fileRef.getDownloadURL();
                    setUrl(url);
                    const createdAt = timestamp();
                    collectionRef.add({ url, createdAt });
                })
        }
        uploadImage();
    }, [image])

    return { progress, imageUploadeError, URL }

}

export default useFirestore