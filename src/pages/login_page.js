import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import "./login_page.css";

export default function LoginForm() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const type = searchParams.get('type');
    setUserType(type || '');
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Login attempt:', {
      userType: userType,
      email: formData.email,
      password: formData.password
    });
    
    alert('Login successful!');
  };

  const getTitle = () => {
    if (userType === 'client') return 'Client Login';
    if (userType === 'freelancer') return 'Freelancer Login';
    return 'Login';
  };

  return (
    <div>

      {/* Login Container */}
      <div className="login-container">
        <div className="login-box">
          <h2 id="loginTitle">{getTitle()}</h2>
          <p className="subtitle">Enter your credentials to continue</p>
          
          <div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button onClick={handleSubmit} className="login-btn">Login</button>
          </div>

          <a href="/login" className="back-link">← Back to selection</a>
        </div>
      </div>
    </div>
  );
}