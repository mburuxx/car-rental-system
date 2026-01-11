import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Profile from './pages/Profile';
import Register from './pages/Register';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/profile';
    } catch (err) {
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Car Rental Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav style={{ padding: '10px', background: '#282c34', color: 'white' }}>
          <Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link>
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} /> {/* 3. Add Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;