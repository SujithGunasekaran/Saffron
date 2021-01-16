import React, { useState } from 'react';
import Header from '../Components/Header';
import ImageUpload from '../Components/ImageUpload';
import ImageCard from '../Components/ImageCard';
import ImageModel from '../Components/ImageModel';

export default function Home() {

    const [selectedImage, setSelectedImage] = useState('')

    return (
        <div>
            <Header />
            <ImageUpload />
            <ImageCard setSelectedImage={setSelectedImage} />
            {
                selectedImage ? <ImageModel selectedImage={selectedImage} setSelectedImage={setSelectedImage} /> : null
            }
        </div>
    )
}