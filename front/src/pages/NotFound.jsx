import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold text-white mb-4">Page not found</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-md mx-auto">
            Oups ! La page que vous recherchez n'existe pas ou a été supprimée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all transform hover:scale-105"
          >
            Accueil
          </button>
        </div>

        <div className="mt-16">
          <div className="inline-block p-8 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm">
              ID d'erreur: <span className="font-mono text-slate-400">{Math.random().toString(36).substr(2, 9)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
