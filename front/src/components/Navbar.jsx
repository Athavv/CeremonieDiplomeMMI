import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(5, 10, 24, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '1rem 2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontFamily: 'Playfair Display',
          fontWeight: 'bold',
          color: 'var(--secondary)'
        }}>
          MMI 2025
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/">Accueil</Link>
          <Link to="/guestbook">Livre d'or</Link>
          {user && <Link to="/gallery">Galerie</Link>}
          {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
          
          {user ? (
            <button 
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid var(--secondary)',
                color: 'var(--secondary)',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px'
              }}
            >
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="btn-primary">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
