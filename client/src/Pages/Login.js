import React, { useState } from 'react';
import '../css/form.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [userInfo, setUserInfo] = useState({ username: '', password: '' })
    const [fieldNameError, setFieldNameError] = useState({ usernameError: '', passwordError: '' })
    const [loginError, setLoginError] = useState('')

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
        if (loginError) {
            setLoginError('')
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let result = validateForm();
        if (result) {
            let { username, password } = userInfo;
            const userData = { username: username, password: password };
            try {
                let responseData = await axios.post('http://localhost:5000/userData/user/login', userData)
                console.log(responseData.data)
            }
            catch (err) {
                setLoginError('Invalid Username or Password')
            }
        }
    }

    const validateForm = () => {
        let result = true;
        Object.keys(userInfo).forEach((fieldName) => {
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

    return (
        <div>
            <div className="form-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="form-container">
                                <div className="form-logo-name">Saffron</div>
                                <div className="form-heading-name">Welcome Back, To Gallery Store</div>
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
                                    <button className="form-submit-btn">Sign in</button>
                                    {
                                        loginError ? <div className="form-error">{loginError}</div> : null
                                    }
                                    <div className="form-having-account">Don't have an Account? <Link to="/signup">Signup</Link></div>
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

export default Login