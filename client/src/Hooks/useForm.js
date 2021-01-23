import axios from 'axios';
import { useState } from 'react';
import { SET_USERNAME, SET_USER_TOKEN } from '../Redux/actions/type';
import store from '../store';

const useForm = (pageName) => {

    const [userInfo, setUserInfo] = useState({ username: '', password: '' });
    const [fieldNameError, setFieldNameError] = useState({ usernameError: '', passwordError: '' });
    const [formError, setFormError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('')

    const handleInputChange = (e) => {
        setUserInfo((prevUserInfo) => {
            let userData = JSON.parse(JSON.stringify(prevUserInfo));
            userData[e.target.name] = e.target.value;
            return userData
        })
        if (fieldNameError[e.target.name + 'Error'] !== '') {
            setFieldNameError((prevFieldNameError) => {
                let fieldNameError = JSON.parse(JSON.stringify(prevFieldNameError));
                fieldNameError[e.target.name + 'Error'] = '';
                return fieldNameError;
            })
        }
        if (formError) { setFormError('') }
        if (signupSuccess) { setSignupSuccess('') }
    }

    const resetFormField = () => {
        setUserInfo((prevUserInfo) => {
            let userData = JSON.parse(JSON.stringify(prevUserInfo));
            Object.keys(userData).forEach((fieldName) => {
                userData[fieldName] = ''
            })
            return userData;
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let result = validateForm();
        if (result) {
            const { username, password } = userInfo;
            const userData = { username: username, password: password };
            try {
                let responseData = await axios.post(`http://localhost:5000/userData/user/${pageName.toLowerCase()}`, userData)
                console.log("page name", pageName)
                if (pageName === 'Login') {
                    store.dispatch({
                        type: SET_USERNAME,
                        userName: responseData.data
                    })
                    store.dispatch({
                        type: SET_USER_TOKEN,
                        userToken: 'asdas!@#!@jsbdfjbs.12(ssfsdfdfds23a'
                    })
                }
                else if (pageName === 'Signup') {
                    setSignupSuccess('Account Created Successfully');
                    resetFormField();
                }
            }
            catch (err) {
                console.log(err)
                if (pageName === 'Login') {
                    setFormError('Invalid Username or Password')
                }
                else if (pageName === 'Signup') {
                    setFormError('Username Already Exist')
                }
            }
        }
    }

    const validateForm = () => {
        let result = true;
        Object.keys(userInfo).forEach((fieldName) => {
            if (userInfo[fieldName] === '') {
                setFieldNameError((prevFieldNameError) => {
                    let fieldNameError = JSON.parse(JSON.stringify(prevFieldNameError));
                    fieldNameError[fieldName + 'Error'] = `Please Enter ${fieldName}`;
                    return fieldNameError;
                })
                result = false;
            }
            if (fieldName === 'password' && userInfo[fieldName] !== '' && userInfo[fieldName].length < 8 && pageName === 'Signup') {
                setFieldNameError((prevFieldNameError) => {
                    let fieldNameError = JSON.parse(JSON.stringify(prevFieldNameError));
                    fieldNameError[fieldName + 'Error'] = 'Password Must Atleast 8 Character';
                    return fieldNameError;
                })
                result = false;
            }
        })

        return result;
    }

    return { userInfo, fieldNameError, formError, signupSuccess, handleInputChange, handleFormSubmit };
}


export default useForm;