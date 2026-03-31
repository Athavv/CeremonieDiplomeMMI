import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    setLoading(true);
    const result = await changePassword(password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError('Erreur lors du changement de mot de passe.');
    }
  };

  return (
    <div className="min-h-screen bg-[#071341] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#B8AB38]/10 border border-[#B8AB38]/30 flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-[#B8AB38]" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-white uppercase tracking-widest mb-3">
            Bienvenue
          </h1>
          <div className="w-12 h-px bg-[#B8AB38] mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Première connexion — définissez votre mot de passe personnel pour accéder à votre espace.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#B8AB38] to-transparent" />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#B8AB38] mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-white placeholder:text-white/20 focus:border-[#B8AB38] focus:outline-none transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-white/30 hover:text-[#B8AB38] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#B8AB38] mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-white placeholder:text-white/20 focus:border-[#B8AB38] focus:outline-none transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-0 top-3 text-white/30 hover:text-[#B8AB38] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-[#B8AB38] text-[#071341] uppercase tracking-[0.2em] text-sm font-medium hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enregistrement...' : 'Valider'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6 uppercase tracking-widest">
          Cérémonie de Remise des Diplômes — MMI
        </p>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
