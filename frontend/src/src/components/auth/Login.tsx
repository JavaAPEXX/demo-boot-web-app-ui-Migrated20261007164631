import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  contextPath?: string;
  error?: string | null;
  message?: string | null;
  csrfParameterName?: string;
  csrfToken?: string;
}

const Login: React.FC<LoginProps> = ({
  contextPath = '',
  error = null,
  message = null,
  csrfParameterName = '_csrf',
  csrfToken = ''
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    if (csrfParameterName && csrfToken) {
      formData.append(csrfParameterName, csrfToken);
    }

    fetch(`${contextPath}/login`, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
    .then(res => {
      if (res.redirected) {
        navigate(res.url);
      } else if (res.ok) {
        // If no redirect, assume success or handle based on specific app logic
        navigate(`${contextPath}/welcome`); 
      } else {
        // In a real app, we might parse error response here
        console.error('Login failed');
      }
    })
    .catch(err => {
      console.error('Error during login:', err);
    });
  };

  return (
    <div className="modern-container">
      <header className="modern-header">
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <Link to="/" className="navbar-brand">App Name</Link>
        </nav>
      </header>

      <main className="modern-main">
        <div className="modern-card">
          <form method="POST" action={`${contextPath}/login`} className="form-signin" onSubmit={handleSubmit}>
            <h2 className="form-heading modern-heading">Log in</h2>

            <div className={`form-group ${error ? 'has-error' : ''}`}>
              {message && <span className="modern-message">{message}</span>}
              
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input 
                  id="username"
                  name="username" 
                  type="text" 
                  className="form-control" 
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  id="password"
                  name="password" 
                  type="password" 
                  className="form-control" 
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {error && <span className="modern-error alert-box alert-danger">{error}</span>}
              
              {csrfParameterName && csrfToken && (
                <input type="hidden" name={csrfParameterName} value={csrfToken} />
              )}

              <button className="btn btn-lg btn-primary btn-block modern-btn" type="submit">Log In</button>
              
              <h4 className="text-center modern-link-container">
                <Link to={`${contextPath}/registration`} className="modern-link">Create an account</Link>
              </h4>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;