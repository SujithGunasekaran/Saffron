import React, { useState } from 'react';
import '../css/form.css';
import { Link, Redirect } from 'react-router-dom';
import { setUserName, setUserToken } from '../Redux/actions/AthenticateAction';
import { connect } from 'react-redux';
import useForm from '../Hooks/useForm';

function Login(props) {

    const [pageName, setPageName] = useState('Login');
    const { userInfo, fieldNameError, formError, handleInputChange, handleFormSubmit } = useForm(pageName)
    if (props.AuthenticateReducer.usertoken) {
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
                                            formError ? <div className="form-error">{formError}</div> : null
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
}

const mapStateToProps = (state) => (
    {
        AuthenticateReducer: state.AuthenticateReducer
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        setUserName: (username) => dispatch(setUserName(username)),
        setUserToken: (usertoken) => dispatch(setUserToken(usertoken))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)