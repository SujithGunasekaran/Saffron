import React from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { FiLogOut } from 'react-icons/fi';
import { connect } from 'react-redux';
import { setUserName, setUserToken } from '../Redux/actions/AthenticateAction';


function Header(props) {

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
                                <Link to='/Login'>Signin</Link> / <Link to="Signup">Signup</Link>
                            </div> :
                            <div className="header-user-name-display">
                                <div className="header-tooltip">
                                    <FiLogOut className="header-user-logout" onClick={() => removerUsername()} />
                                    <span className="header-tooltip-open">Logout</span>
                                </div>
                                <div className="header-user-name">{username}</div>
                                <Avatar className="header-user-avatar">{username.charAt(0)}</Avatar>
                            </div>
                    }

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