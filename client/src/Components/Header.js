import React from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <div className="header-container">
                <div className="header-main">
                    <div className="header-logo-name">Saffron</div>
                    <div className="header-login-name">
                        <Link to='/Login'>Signin</Link> / <Link to="Signup">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}