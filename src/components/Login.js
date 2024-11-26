import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // Récupérer le token JWT
      const accessToken = data['acces-token'];
      localStorage.setItem('accessToken', accessToken);

      // Décoder le JWT pour extraire les informations utilisateur
      const decodedJwt = JSON.parse(atob(accessToken.split('.')[1]));
      const role = decodedJwt.scope; // Le rôle est extrait ici (comme "admin" ou "client")
      const username = decodedJwt.sub; // Nom d'utilisateur

      // Stocker les informations utilisateur dans localStorage
      localStorage.setItem('userName', username);
      localStorage.setItem('role', role);
      localStorage.setItem('ia', 'true');

      console.log('Login successful:', { username, role });

      // Redirection en fonction du rôle
      if (role === 'ADMIN CLIENT') {
        navigate('/dashboard'); // Redirection vers le tableau de bord pour l'admin
      } else if (role === 'CLIENT') {
        navigate('/'); // Redirection vers la page d'accueil pour le client
      } else {
        setError('Unauthorized role');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Login</h2>
      <form
        className="mx-auto"
        style={{ maxWidth: '400px' }}
        onSubmit={handleSubmit}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
