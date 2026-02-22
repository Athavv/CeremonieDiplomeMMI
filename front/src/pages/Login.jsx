import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!identifier || !password) {
            return setError('Veuillez remplir tous les champs');
        }

        setLoading(true);

        try {
            const result = await login(identifier, password);
            if (result.success) {
                if (result.firstLogin) {
                    navigate('/change-password');
                } else {
                    navigate('/');
                }
            } else {
                setError(result.message || 'Identifiants invalides');
            }
        } catch (err) {
            setError('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(7, 19, 65, 0.6), rgba(7, 19, 65, 0.8)), url('/home.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1rem'
            }}
        >

            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxWidth: '550px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{ padding: '3rem 2.5rem' }}>
                    <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#64748b',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        marginBottom: '2rem'
                    }}>
                        <ArrowLeft size={16} /> Retour à l'accueil
                    </Link>
<div 
  style={{ 
    textAlign: 'center', 
    marginBottom: '2.5rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400
  }}
>
<img src="/iconconnexion.png" className='mx-auto' style={{ width: '100px'}} />
  <h2 style={{
      fontSize: '2rem',
      color: '#071341',
      marginBottom: '0.5rem',
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400 
    }}>
    Connexion
  </h2>
  <p 
    className="text-[#071341] font-regular"
    style={{
      fontFamily: "'Poppins', sans-serif",
    }}
  >
    Bienvenue, connectez-vous pour continuer
  </p>
</div>
                    {error && (
                        <div style={{
                            marginBottom: '2rem',
                            padding: '1rem',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fee2e2',
                            borderRadius: '0.75rem',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '0.9rem'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 400
                        }}
                    >
                        <div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    placeholder="Identifiant"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0',
                                        border: 'none',
                                        borderBottom: '1px solid #071341',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s',
                                        borderRadius: '0',
                                        fontFamily: "'Playfair Display', serif",
                                        fontWeight: 400
                                    }}
                                    className="input-underline italic"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0',
                                        border: 'none',
                                        borderBottom: '1px solid #071341',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s',
                                        
                                        borderRadius: '0',
                                        fontFamily: "'Playfair Display', serif",
                                        fontWeight: 400
                                    }}
                                    className="input-underline italic"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="uppercase bg-[#071341] text-white py-5"
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>
                    <div style={{ marginTop: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                        <p>Pas encore de compte ? <span style={{ color: '#071341' }}>Contactez l'administration</span></p>
                    </div>
                </div>
            </div>
            <style>{`
                .input-underline:focus {
                    border-bottom-color: #071341 !important;
                }
                .btn-hover:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(7, 19, 65, 0.3) !important;
                }
                .btn-hover:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

export default Login;
