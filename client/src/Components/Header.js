import React, { useEffect } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { FiLogOut } from 'react-icons/fi';
import { connect } from 'react-redux';
import { setUserName, setUserToken } from '../Redux/actions/AthenticateAction';
import { GoSignIn } from 'react-icons/go';
import { IoPersonAdd } from 'react-icons/io5';

function Header(props) {

    useEffect(() => {
        let sidebar = document.getElementById('avatar');
        if (sidebar) {
            sidebar.addEventListener('click', () => {
                let openSideBar = document.getElementsByClassName('mobile-view-side-bar')
                openSideBar[0].classList.add('open');
            })
        }
        let sidebarClose = document.querySelectorAll('#close-model')
        for (let i = 0; i < sidebarClose.length; i++) {
            sidebarClose[i].addEventListener('click', () => {
                let closeModel = document.getElementsByClassName('mobile-view-side-bar');
                closeModel[0].classList.remove('open');
            })
        }
    })

    const { username } = props.AuthenticateReducer;

    const removerUsername = () => {
        props.setUserName('')
        props.setUserToken('')
        window.localStorage.clear('state')
    }

    return (
        <div>
            <div className="header-container">
                <div className="header-main">
                    <div className="header-logo-name">Saffron</div>
                    {
                        username === '' ?
                            <div className="header-login-name">
                                <div className="header-mobile-view">
                                    <Link to='/Login'><GoSignIn /></Link> / <Link to="Signup"><IoPersonAdd /></Link>
                                </div>
                                <div className="header-normal-view">
                                    <Link to='/Login'>Signin</Link> / <Link to="Signup">Signup</Link>
                                </div>
                            </div> :
                            <div className="header-user-name-display">
                                <div className="header-tooltip">
                                    <div className="header-user-logout-normal-view">
                                        <FiLogOut className="header-user-logout" onClick={() => removerUsername()} />
                                    </div>
                                    <span className="header-tooltip-open">Logout</span>
                                </div>
                                <div className="header-user-name">{username}</div>
                                <Avatar className="header-user-avatar" id="avatar">{username.charAt(0)}</Avatar>
                            </div>
                    }

                </div>
            </div>
            <div className="mobile-view-side-bar">
                <div className="mobile-view-side-close-btn" id='close-model' />
                <div className="mobile-view-name">Welcome, {username}</div>
                <div className="mobile-view-signout-display" id='close-model' onClick={() => removerUsername()}>
                    <FiLogOut className="mobile-view-signout-icon" />
                    <div className="mobile-view-signout-name">Sign Out</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    AuthenticateReducer: state.AuthenticateReducer
})

const mapDispatchToProps = (dispatch) => ({
    setUserName: (username) => dispatch(setUserName(username)),
    setUserToken: (usertoken) => dispatch(setUserToken(usertoken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)