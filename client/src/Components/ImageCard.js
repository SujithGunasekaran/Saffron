import React from 'react';
import useFirebaseDb from '../Hooks/useFirebaseDb';
import { FiDownload } from 'react-icons/fi';
import '../css/imageCard.css';


export default function ImageCard({ setSelectedImage, imageHeight }) {

    const { imageList } = useFirebaseDb('images');
    const downloadImage = (url, imageName) => {
        window.open(url)
    }

    return (
        <div>
            <div className="image-card-container">
                <div className="container-fluid">
                    <div className="row">
                        {
                            imageList.length > 0 && imageList.map((image, index) => (
                                <div className="col-md-4" key={index}>
                                    <img className="image-card-image" height={imageHeight} src={image.url} alt="image" onClick={() => setSelectedImage(image.url)} />
                                    <div className="image-info-display">
                                        <div className="image-card-username">Published By : {image.username}</div>
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