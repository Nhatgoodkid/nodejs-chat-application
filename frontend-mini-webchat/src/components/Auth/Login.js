import React, { useState } from 'react';
import loginImage from '../../assets/images/login.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../services/authService';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth';

import './Auth.scss';

const Login = ({ history }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('nhat@gmail.com');
    const [password, setPassword] = useState('secret');
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }, history)).catch((err) =>
            setErrorMessage(console.log('Error')),
        );
    };

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={loginImage} alt="Login" />
                    </div>

                    <div id="form-section">
                        <h2>Welcome Back</h2>
                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}

                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required="required"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="input-field mb-2">
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    required="required"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>

                            <button>LOGIN</button>
                        </form>

                        <p>
                            Don't have an account?
                            <Link to="/auth/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
