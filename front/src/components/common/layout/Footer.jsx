import React from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../../constants';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route, { replace: false }); 
    window.scrollTo(0, 0); 
  };

  return (
    <footer className="bg-[#050517] text-white mt-9">
      <div className="px-6 py-12 sm:px-8 lg:px-16">
        
        <div className="mb-8">
           <h2 className="text-2xl font-bold text-white">DIPLOME MMI</h2>
        </div>

        <nav className="flex flex-col gap-4 sm:flex-row sm:gap-20 mb-8">
          <span
            className="text-white text-base sm:text-lg lg:text-xl cursor-pointer hover:underline"
            onClick={() => handleNavigate(ROUTES.HOME)}
          >
            Accueil
          </span>

          <span
            className="text-white text-base sm:text-lg lg:text-xl cursor-pointer hover:underline"
            onClick={() => handleNavigate(ROUTES.GUESTBOOK)}
          >
            Livre d'or
          </span>
           <span
            className="text-white text-base sm:text-lg lg:text-xl cursor-pointer hover:underline"
            onClick={() => handleNavigate(ROUTES.GALLERY)}
          >
            Galerie
          </span>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8 sm:text-base font-light">
          <div>
            <span className="underline">Contact</span> : contact@diplomemmi.fr
          </div>
        </div>

        <hr className="mb-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center font-light sm:text-sm">
          <p>© 2026 Diplome MMI. Tous les droits réservés.</p>
        </div>

      </div>
    </footer>
  );
}
