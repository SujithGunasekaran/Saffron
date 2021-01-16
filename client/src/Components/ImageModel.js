import React from 'react';
import '../css/imageModel.css';

export default function ImageModel({ selectedImage, setSelectedImage }) {
    return (
        <div>
            <div className="image-model-main" onClick={() => setSelectedImage('')}>
                <img src={selectedImage} alt="image" className="image-model-img-view" />
            </div>
        </div>
    )
}