import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { User, Pencil } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import EditProfileModal from "../common/EditProfileModal";

export default function AdminLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const navItems = [
    { path: ROUTES.ADMIN, label: "Tableau de bord" },
    { path: ROUTES.ADMIN_USERS, label: "Utilisateurs" },
    { path: ROUTES.GUESTBOOK, label: "Livret d'or" }, // Using public route for now or should create admin route?
    { path: ROUTES.GALLERY, label: "Galerie" }, // Same here
  ];
  
  // Update navItems to point to Admin specific pages if I create them
  const adminNavItems = [
    { path: "/admin", label: "Tableau de bord" },
    { path: "/admin/users", label: "Utilisateurs" },
    { path: "/admin/guestbook", label: "Livret d'or" },
    { path: "/admin/gallery", label: "Galerie" }, 
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="pt-24 px-6 md:px-16 py-6 bg-[#F9F9F9] border-b border-gray-200">
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.imageUrl ? (
                <img
                  src={user.imageUrl} // Assuming direct URL or need getImageUrl helper
                  alt={`${user.firstname} ${user.lastname}`}
                  className="h-24 w-24 rounded-full object-cover border-2 border-[#B8AB38]"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-[#B8AB38] flex items-center justify-center border-2 border-[#B8AB38]">
                  <User className="h-12 w-12 text-[#071341]" />
                </div>
              )}
              <div>
                <p className="text-base text-gray-600 mb-1">
                  Content de te revoir !
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-[#071341]">
                    {user.firstname && user.lastname
                      ? `${user.firstname} ${user.lastname}`
                      : user.email?.split("@")[0] || "Utilisateur"}
                  </h2>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="p-1.5 text-gray-600 hover:text-[#071341] hover:bg-gray-100 rounded-full transition-colors"
                    title="Modifier mon profil"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-[#071341] bg-white border border-gray-200`}
                >
                  <User className="h-5 w-5 text-[#071341]" />
                  {user.role}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gray-300 animate-pulse"></div>
              <div>
                <div className="h-5 w-40 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-7 w-56 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 md:px-16 border-b border-gray-200 bg-[#F9F9F9] overflow-x-auto">
        <nav className="flex gap-8">
          {adminNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
                isActive(item.path)
                  ? "text-[#B8AB38]"
                  : "text-gray-600 hover:text-[#071341]"
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8AB38]"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-6 md:px-16 py-8">
        <Outlet />
      </div>
      
      {showEditModal && user && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {/* handle success (maybe refresh user) */}}
        />
      )}
    </div>
  );
}
