import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const Navbar = () => {
 const { user, logout } = useAuth();
 const navigate = useNavigate();


 // const [isScrolled, setIsScrolled] = useState(false);
 const [open, setOpen] = useState(false);


 // useEffect(() => {
 //   const handleScroll = () => {
 //     setIsScrolled(window.scrollY > 50);
 //   };


 return (
   <nav
     className="fixed top-0 left-0 w-full flex items-center justify-between py-4 px-6 uppercase z-50 transition-all duration-300 bg-[#071341]"
   >
     <img src="/logouge.png" className="w-10 h-10" alt="Logo" />
     <ul className="hidden md:flex items-center gap-8 text-sm text-white">
       <li><Link to="/">Accueil</Link></li>
       <li><Link to="/planning">Planning</Link></li>
       <li><Link to="/gallery">Galerie photo</Link></li>
       <li><Link to="/guestbook">Livret d'or</Link></li>
       {user?.role === 'ADMIN' && (
         <li><Link to="/admin">Admin</Link></li>
       )}
       {!user ? (
         <li><Link to="/login">Connexion</Link></li>
       ) : (
         <li><button onClick={logout} className="hover:text-gray-300">Déconnexion</button></li>
       )}
     </ul>
     <button
       className="md:hidden text-white text-3xl" onClick={() => setOpen(!open)}>☰
     </button>
     {open && (
       <div className="absolute top-full left-0 w-full bg-[#071341] text-white flex flex-col items-center py-4 gap-4 md:hidden">
         <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
         <Link to="/planning" onClick={() => setOpen(false)}>Planning</Link>
         <Link to="/gallery" onClick={() => setOpen(false)}>Galerie photo</Link>
         <Link to="/guestbook" onClick={() => setOpen(false)}>Livret d'or</Link>
         {user?.role === 'ADMIN' && (
           <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
         )}
         {!user ? (
           <Link to="/login" onClick={() => setOpen(false)}>Connexion</Link>
         ) : (
           <button onClick={() => { logout(); setOpen(false); }} className="text-white hover:text-gray-300">Déconnexion</button>
         )}
       </div>
     )}
   </nav>
 );
};


export default Navbar;



