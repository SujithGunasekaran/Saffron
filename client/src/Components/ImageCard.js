import React, { useEffect, useState } from 'react';
// import useFirebaseDb from '../Hooks/useFirebaseDb';
import { galleryFireStore } from '../Firebase/config';
import { FiDownload } from 'react-icons/fi';
import '../css/imageCard.css';


export default function ImageCard({ setSelectedImage }) {

    const [imageList, setImageList] = useState([])

    useEffect(() => {
        const db = galleryFireStore.collection('images')
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
    }, [])

    const downloadImage = (url, imageName) => {
        var element = document.createElement('a');
        element.setAttribute('href',
            'data:text/plain;charset=utf-8, '
            + encodeURIComponent(url));
        element.setAttribute('download', imageName);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // const { imageList } = useFirebaseDb('images');
    // console.log(imageList)

    return (
        <div>
            <div className="image-card-container">
                <div className="container-fluid">
                    <div className="row">
                        {
                            imageList.length > 0 && imageList.map((image, index) => (
                                <div className="col-md-4" key={index}>
                                    <img className="image-card-image" src={image.url} alt="image" onClick={() => setSelectedImage(image.url)} />
                                    <div className="image-info-display">
                                        <div className="image-card-username">{image.username}</div>
                                        <FiDownload className="image-card-download-icon" onClick={() => downloadImage(image.url, image.imageName)} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}