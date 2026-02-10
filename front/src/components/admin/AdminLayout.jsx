import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
// import Header from "../common/layout/Header.jsx";
import Footer from "../common/layout/Footer.jsx";
import { useAuth } from "../../contexts/AuthContext";
import { User, Pencil, LogOut, Home } from "lucide-react";
import { ROUTES } from "../../constants";
// Inline helpers
const getRoleLabel = (role) => (role === "ADMIN" ? "Administrateur" : "Utilisateur");
import { getImageUrl } from "../../api/api";
import EditProfileModal from "../common/EditProfileModal.jsx";

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      window.location.href = "/login";
    }
  };

  const handleEditSuccess = async () => {
    setShowEditModal(false);
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const navItems = [
    { path: ROUTES.ADMIN, label: "Tableau de bord" },
    { path: ROUTES.ADMIN_USERS, label: "Utilisateurs" },
    { path: "/admin/guestbook", label: "Livre d'or" },
    { path: "/admin/gallery", label: "Galerie" },
  ];

  return (
    <div className="min-h-screen bg-fond">
      {/* Top Bar replacing global Header */}
      <div className="px-16 py-4 bg-vert flex justify-between items-center shadow-sm">
        <Link to="/" className="flex items-center gap-2 text-noir font-bold text-xl hover:opacity-80 transition-opacity">
            <Home className="h-5 w-5" />
            Retour Site
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-2 text-noir font-medium hover:text-white transition-colors">
            <LogOut className="h-5 w-5" />
            Déconnexion
        </button>
      </div>

      <div className="px-16 py-8 bg-fond border-b border-gray-200">
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.imageUrl ? (
                <img
                  src={getImageUrl(user.imageUrl)}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="h-24 w-24 rounded-full object-cover border-4 border-vert shadow-lg"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-vert flex items-center justify-center border-4 border-white shadow-lg text-noir">
                  <User className="h-10 w-10" />
                </div>
              )}
              <div>
                <p className="text-base text-gray-500 mb-1 font-medium">
                  Espace Administration
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-noir">
                    {user.firstname && user.lastname
                      ? `${user.firstname} ${user.lastname}`
                      : user.email?.split("@")[0] || "Administrateur"}
                  </h2>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="p-2 text-gray-400 hover:text-vert hover:bg-gray-100 rounded-full transition-all"
                    title="Modifier mon profil"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-noir`}
                >
                  {getRoleLabel(user.role)}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6 animate-pulse">
              <div className="h-24 w-24 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-16 border-b border-gray-200 bg-white sticky top-0 z-40 bg-opacity-90 backdrop-blur-sm">
        <nav className="flex gap-8 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-5 px-1 text-sm font-medium transition-all relative border-b-2 ${
                isActive(item.path)
                  ? "text-noir border-orange" // Active color
                  : "text-gray-500 border-transparent hover:text-orange"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-16 py-8 min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
      {showEditModal && user && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
