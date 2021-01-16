import React from 'react';
import useFirebaseDb from '../Hooks/useFirebaseDb';
import '../css/imageCard.css';

export default function ImageCard({ setSelectedImage }) {

    const { imageList } = useFirebaseDb('images');
    console.log(imageList)

    return (
        <div>
            <div className="image-card-container">
                <div className="container-fluid">
                    <div className="row">
                        {
                            imageList.length > 0 && imageList.map((image, index) => (
                                <div className="col-md-4" key={index}>
                                    <img className="image-card-image" src={image.url} alt="image" onClick={() => setSelectedImage(image.url)} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}