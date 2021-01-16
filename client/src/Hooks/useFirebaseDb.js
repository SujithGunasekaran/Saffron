import { useEffect, useState } from 'react';
import { galleryFireStore } from '../Firebase/config';

const useFirebaseDb = (collectionName) => {

    const [imageList, setImageList] = useState([])

    useEffect(() => {
        const db = galleryFireStore.collection(collectionName)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let list = [];
                snap.forEach((image) => {
                    list.push({
                        ...image.data(),
                        id: image.id
                    })
                })
                setImageList(list)
            })

        return () => db()

    }, [collectionName])

    return { imageList }

}

export default useFirebaseDb;