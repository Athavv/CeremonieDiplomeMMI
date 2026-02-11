import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { LogOut, ShoppingCart } from "lucide-react";
import { ROUTES } from "../../../constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const isAuthenticated = !!user;
  const role = user?.role;

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      navigate(ROUTES.LOGIN);
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="relative top-0 z-50 flex items-center justify-between py-4 px-6 md:px-16 bg-white shadow-sm">
      <Link
        to={ROUTES.HOME}
        className="text-xl font-bold text-vert relative z-10"
      >
        <span className="text-noir font-bold text-lg">DIPLOME MMI</span>
      </Link>
      <nav className="hidden lg:flex gap-12 text-sm font-medium bg-vert px-6 py-2 rounded-full relative z-10">
        <Link
          to={ROUTES.HOME}
          className={`px-8 py-3 rounded-full transition-all ${
            isActive("/") && !isActive("/admin")
              ? "bg-blanc text-noir"
              : "hover:bg-blanc"
          }`}
        >
          Accueil
        </Link>
        <Link
          to={ROUTES.GUESTBOOK}
          className={`px-8 py-3 rounded-full transition-all ${
            isActive(ROUTES.GUESTBOOK) ? "bg-blanc text-noir" : "hover:bg-blanc"
          }`}
        >
          Livre d'or
        </Link>
        <Link
          to={ROUTES.GALLERY}
           className={`px-8 py-3 rounded-full transition-all ${
            isActive(ROUTES.GALLERY) ? "bg-blanc text-noir" : "hover:bg-blanc"
          }`}
        >
          Galerie
        </Link>
        
        {role === "ADMIN" && (
             <Link
             to={ROUTES.ADMIN}
             className={`px-8 py-3 rounded-full transition-all ${
               isActive(ROUTES.ADMIN) ? "bg-blanc text-noir" : "hover:bg-blanc"
             }`}
           >
             Admin
           </Link>
        )}
      </nav>

      <div className="hidden lg:flex items-center gap-4 relative z-10">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-vert px-8 py-3 rounded-full font-medium hover:-translate-y-1 active:bg-noir active:text-blanc transition-all flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="bg-vert px-8 py-3 rounded-full font-medium hover:-translate-y-1 active:bg-noir active:text-blanc transition-all"
          >
            Connexion
          </Link>
        )}
      </div>
      <button className="lg:hidden text-3xl" onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-fond flex flex-col items-center py-6 gap-6 lg:hidden z-50 shadow-md">
          <Link to={ROUTES.HOME} className="text-lg" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link to={ROUTES.GUESTBOOK} className="text-lg" onClick={() => setOpen(false)}>
            Livre d'or
          </Link>
          <Link to={ROUTES.GALLERY} className="text-lg" onClick={() => setOpen(false)}>
            Galerie
          </Link>
          {role === "ADMIN" && (
              <Link to={ROUTES.ADMIN} className="text-lg" onClick={() => setOpen(false)}>
                Admin
              </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => { handleLogout(); setOpen(false); }}
              className="bg-vert px-6 py-2 rounded-full flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          ) : (
            <Link to={ROUTES.LOGIN} className="bg-vert px-6 py-2 rounded-full" onClick={() => setOpen(false)}>
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
