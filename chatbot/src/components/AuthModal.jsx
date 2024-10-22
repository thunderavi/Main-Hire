// src/components/AuthModal.jsx

import React, { useState } from 'react';
import './authModal.css';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                onClose(); // Close modal after login
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. Please try again.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/accounts/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Registration successful:', data);
                onClose(); // Close modal after registration
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isLogin ? 'User Login' : 'User Register'}</h2>
                
                {error && <div className="error">{error}</div>}

                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    
                    <button type="submit" className="submit-button">
                        {isLogin ? 'User Login' : 'User Register'}
                    </button>

                    <div className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </div>
                </form>

                <button className="close-button" onClick={onClose}>✖</button>
            </div>
        </div>
    );
};

export default AuthModal;
