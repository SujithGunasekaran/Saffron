import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    const [userInfo, setUserInfo] = useState({ username: '', password: '' })
    const [fieldNameError, setFieldNameError] = useState({ usernameError: '', passwordError: '' })
    const [signupError, setSignupError] = useState('')
    const [signupSuccess, setSignupSuccess] = useState('')

    const handleInputChange = (e) => {
        setUserInfo((prevUserInfo) => {
            let userData = JSON.parse(JSON.stringify(prevUserInfo))
            userData[e.target.name] = e.target.value;
            return userData
        })
        if (fieldNameError[e.target.name + 'Error'] !== '') {
            setFieldNameError((prevFieldNameError) => {
                let fieldError = JSON.parse(JSON.stringify(prevFieldNameError))
                fieldError[e.target.name + 'Error'] = '';
                return fieldError
            })
        }
        if (signupError) {
            setSignupError('')
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let result = validateForm();
        if (result) {
            let { username, password } = userInfo;
            const userData = { username: username, password: password };
            try {
                let responseData = await axios.post('http://localhost:5000/userData/user/signup', userData)
                setSignupSuccess('Account Created Successfully')
                setUserInfo((prevUserInfo) => {
                    let userData = JSON.parse(JSON.stringify(prevUserInfo))
                    userData['username'] = '';
                    userData['password'] = '';
                    return userData
                })
                console.log(responseData.data)
            }
            catch (err) {
                setSignupError('UserName Already Exist')
            }
        }
    }

    const validateForm = () => {
        let result = true;
        Object.keys(userInfo).forEach((fieldName) => {
            if (fieldName === 'password' && userInfo[fieldName].length < 8) {
                setFieldNameError((prevFieldNameError) => {
                    let fieldError = JSON.parse(JSON.stringify(prevFieldNameError))
                    fieldError[fieldName + 'Error'] = `${fieldName} must be atleast 8 character length`;
                    return fieldError
                })
                result = false;
            }
            if (userInfo[fieldName] === '') {
                setFieldNameError((prevFieldNameError) => {
                    let fieldError = JSON.parse(JSON.stringify(prevFieldNameError))
                    fieldError[fieldName + 'Error'] = `Please Enter ${fieldName}`;
                    return fieldError
                })
                result = false
            }
        })
        return result;
    }

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
                                            signupError ? <div className="form-error">{signupError}</div> : null
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