import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    const result = await changePassword(password);
    if (result.success) {
      navigate('/');
    } else {
      setError("Erreur lors du changement de mot de passe");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-dark)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Bienvenue</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          Pour votre première connexion, veuillez définir votre mot de passe personnel.
        </p>
        
        {error && <p style={{ color: '#ff4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '1rem', marginTop: '0.5rem',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                borderRadius: '8px', color: 'white'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%', padding: '1rem', marginTop: '0.5rem',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                borderRadius: '8px', color: 'white'
              }}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Valider</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
