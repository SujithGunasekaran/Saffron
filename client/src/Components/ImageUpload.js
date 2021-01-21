import React, { useState } from 'react';
import '../css/imageUploade.css';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Progress from '../Components/Progress';

export default function ImageUpload() {

    const [fileName, setFileName] = useState('')
    const [imageError, setImageError] = useState('')

    const imageUploader = (e) => {
        window.scrollTo({ top: '0', behavior: 'smooth' })
        setImageError('')
        var imageType = ['image/jpeg', 'image/jpg', 'image/png'];
        const selectedImage = e.target.files[0];
        if (selectedImage && imageType.includes(selectedImage.type)) {
            setFileName(selectedImage)
        }
        else {
            setImageError('Please select image file ( png or jpeg )')
        }
    }

    return (
        <div>
            <div className="image-upload-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="image-upload-heading">Pictures</div>
                            <label>
                                <input type="file" onChange={imageUploader} />
                                <div className="image-upload-tooltip">
                                    <span className="image-upload-icon"><AddIcon style={{ fontSize: '20px' }} /></span>
                                    <span className="image-upload-tooltip-open">Upload Image</span>
                                </div>
                                {/* <Tooltip title="Upload Image" arrow>
                                    <span><AddIcon style={{ fontSize: '20px' }} /></span>
                                </Tooltip> */}
                            </label>
                            {
                                fileName ? <div className="image-upload-file-name">Uploading {fileName.name}...</div> : null
                            }
                            {
                                imageError ? <div className="image-upload-error">{imageError}</div> : null
                            }
                            {
                                fileName ? <Progress file={fileName} setFileName={setFileName} /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}