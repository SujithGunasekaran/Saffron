import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import useForm from '../Hooks/useForm';

function Signup() {

    const [pageName, setPageName] = useState('Signup');
    const { userInfo, fieldNameError, formError, signupSuccess, handleInputChange, handleFormSubmit } = useForm(pageName)
    if (localStorage.getItem('token')) {
        return <Redirect to='/' />
    }
    else {
        return (
            <div>
                <div className="form-main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 mx-auto">
                                <div className="form-container">
                                    <div className="form-logo-name">Saffron</div>
                                    <div className="form-heading-name">Welcome To Gallery Store</div>
                                    <hr className="form-heading-name-hr" />
                                    <form onSubmit={handleFormSubmit}>
                                        <label className="form-label">Username :</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-input-field"
                                            value={userInfo.username}
                                            onChange={handleInputChange}
                                        />
                                        {
                                            fieldNameError['usernameError'] ? <div className="form-error">{fieldNameError['usernameError']}</div> : null
                                        }
                                        <label className="form-label">Password :</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-input-field"
                                            value={userInfo.password}
                                            onChange={handleInputChange}
                                        />
                                        {
                                            fieldNameError['passwordError'] ? <div className="form-error">{fieldNameError['passwordError']}</div> : null
                                        }
                                        <button className="form-submit-btn">Create Account</button>
                                        {
                                            formError ? <div className="form-error">{formError}</div> : null
                                        }
                                        {
                                            signupSuccess ? <div className="form-signup-success">{signupSuccess} <Link to="/Login">Click here</Link> to Sign-in</div> : null
                                        }
                                        <div className="form-having-account">Already have an Account? <Link to="/Login">Signin</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <hr className="form-footer-hr" />
                                <div className="form-footer">
                                    <div className="form-footer-name"><Link to="/">Home</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup