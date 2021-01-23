import React, { useState } from 'react';
import '../css/imageUploade.css';
import AddIcon from '@material-ui/icons/Add';
import Progress from '../Components/Progress';
import { connect } from 'react-redux';

function ImageUpload(props) {

    const [fileName, setFileName] = useState('')
    const [imageError, setImageError] = useState('')
    const [authenticateError, setAuthenticateError] = useState('');

    const { username } = props.AuthenticateReducer;

    const imageUploader = (e) => {
        window.scrollTo({ top: '0', behavior: 'smooth' })
        if (username) {
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
        else {
            setAuthenticateError('Please Login to Upload Image')
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
                            </label>
                            {
                                fileName ? <div className="image-upload-file-name">Uploading {fileName.name}...</div> : null
                            }
                            {
                                authenticateError ? <div className="image-upload-error">{authenticateError}</div> : null
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

const mapStateToProps = (state) => (
    {
        AuthenticateReducer: state.AuthenticateReducer
    }
)

export default connect(mapStateToProps)(ImageUpload)