import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center mt-" style={{ backgroundImage: `linear-gradient(rgba(7, 19, 65, 0.6), rgba(7, 19, 65, 0.8)), url('/home.jpg')` }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="my-24 bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-2xl max-w-[550px] w-full overflow-hidden relative p-10 md:p-12">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 text-sm no-underline mb-8 hover:text-[#071341] transition-colors">
                    <ArrowLeft size={16} /> Retour à l'accueil
                </Link>
                <div className="text-center mb-10 font-poppins font-normal">
                    <img src="/iconconnexion.png" alt="Icône connexion" className="mx-auto w-[100px] mb-4" />
                    <h2 className="text-3xl md:text-4xl text-[#071341] mb-2 font-playfair">Connexion
                    </h2>
                    <p className="text-[#071341] font-regular">Bienvenue, connectez-vous pour continuer</p>
                </div>
                {error && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-500 flex items-center gap-3 text-sm">
                        ⚠️ {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-playfair">
                    <div className="relative">
                        <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Identifiant" required className="w-full py-3 bg-transparent border-b border-[#071341] text-base outline-none transition-all rounded-none italic placeholder:text-gray-400 placeholder:not-italic focus:border-b-[2px]" />
                    </div>
                    <div className="relative">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required className="w-full py-3 bg-transparent border-b border-[#071341] text-base outline-none transition-all rounded-none italic placeholder:text-gray-400 placeholder:not-italic focus:border-b-[2px]" />
                    </div>
                    <button type="submit" disabled={loading} className="mt-4 uppercase bg-[#071341] text-white py-4 font-sans tracking-wider hover:bg-[#B8AB38] hover:text-[#071341] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0">
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
                <div className="mt-10 text-center text-slate-500 text-sm font-poppins">
                    <p>
                        Pas encore de compte ?{' '}
                        <a href="mailto:abi.vigneswaran@edu.univ-eiffel.fr?subject=Demande de création de compte" className="text-[#071341] font-medium hover:underline cursor-pointer">
                            Contactez l'administration
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
export default Login;
