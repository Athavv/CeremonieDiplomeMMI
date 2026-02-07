import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!email || !password) {
            return setError('Veuillez remplir tous les champs');
        }

        if(!validateEmail(email)) {
            return setError('Veuillez entrer un email valide');
        }

        setLoading(true);

        try {
            const result = await login(email, password);
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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(rgba(7, 19, 65, 0.6), rgba(7, 19, 65, 0.8)), url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
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
                        fontWeight: '500',
                        textDecoration: 'none',
                        marginBottom: '2rem'
                    }}>
                        <ArrowLeft size={16} /> Retour à l'accueil
                    </Link>

                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                        <h2 style={{ 
                            fontSize: '2rem', 
                            color: '#071341', 
                            marginBottom: '0.5rem', 
                            fontFamily: 'Playfair Display',
                            fontWeight: 'bold' 
                        }}>
                            Connexion
                        </h2>
                        <p style={{ color: '#64748b' }}>Bienvenue, connectez-vous pour continuer</p>
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

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.5rem', 
                                color: '#1e293b', 
                                fontWeight: '600',
                                fontSize: '1.1rem'
                            }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="exemple@etu.uni-eiffel.fr"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0',
                                        border: 'none',
                                        borderBottom: '2px solid #e2e8f0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s',
                                        backgroundColor: 'transparent',
                                        borderRadius: '0'
                                    }}
                                    className="input-underline"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.5rem', 
                                color: '#1e293b', 
                                fontWeight: '600',
                                fontSize: '1.1rem'
                            }}>
                                Mot de passe
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0',
                                        border: 'none',
                                        borderBottom: '2px solid #e2e8f0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s',
                                        backgroundColor: 'transparent',
                                        borderRadius: '0'
                                    }}
                                    className="input-underline"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                backgroundColor: '#071341',
                                color: 'white',
                                padding: '1.2rem',
                                borderRadius: '1rem',
                                border: 'none',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s',
                                marginTop: '1rem',
                                width: '100%',
                                boxShadow: '0 4px 6px -1px rgba(7, 19, 65, 0.2)'
                            }}
                            className="btn-hover"
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
                        <p>Pas encore de compte ? <span style={{ fontWeight: '600', color: '#071341' }}>Contactez l'administration</span></p>
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
