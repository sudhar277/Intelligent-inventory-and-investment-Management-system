import React, { useState } from 'react';
import loginImage from './login_pic.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '50%', backgroundColor: '#007BFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={loginImage} alt="Login" style={{maxWidth: '100%', maxHeight: '100%'}} />
      </div>
      <div style={{ flex: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Login</h2>
        <p>Access your account:</p>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="email">Enter your email:</label><br />
          <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
          <button type="button" onClick={handleLogin}>Log in</button><br />
          <a href="##">Forgot your password?</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
