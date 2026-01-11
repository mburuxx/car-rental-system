import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        password: '',
        password2: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register/', formData);
            alert("Registration successful! Please login.");
            navigate('/login'); // Send them to login after success
        } catch (err) {
            console.error(err.response.data);
            alert("Registration failed. Check if email is unique or passwords match.");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Create Car Rental Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" onChange={e => setFormData({...formData, full_name: e.target.value})} required /><br/><br/>
                <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required /><br/><br/>
                <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required /><br/><br/>
                <input type="password" placeholder="Confirm Password" onChange={e => setFormData({...formData, password2: e.target.value})} required /><br/><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;