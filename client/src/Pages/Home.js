import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import ImageUpload from '../Components/ImageUpload';
import ImageCard from '../Components/ImageCard';
import ImageModel from '../Components/ImageModel';
import ImageHeight from '../Json/screenSize.json';

export default function Home() {

    const [selectedImage, setSelectedImage] = useState('');
    const [imageHeight, setImageHeight] = useState('');

    useEffect(() => {
        let imageHeight;
        Object.keys(ImageHeight).forEach((size) => {
            const { height } = ImageHeight[size];
            if (size < window.innerWidth) imageHeight = height;
        })
        setImageHeight(imageHeight);
    }, [window.innerWidth])


    return (
        <div>
            <Header />
            <ImageUpload />
            <ImageCard setSelectedImage={setSelectedImage} imageHeight={imageHeight} />
            {
                selectedImage ? <ImageModel selectedImage={selectedImage} setSelectedImage={setSelectedImage} /> : null
            }
        </div>
    )
}