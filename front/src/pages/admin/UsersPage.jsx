import { useEffect, useState } from "react";
import { userService } from "../../api/user.service";
import { Plus, Search, Edit, Trash2, Users } from "lucide-react";
import { getImageUrl } from "../../api/api";
import CreateUserForm from "../../components/admin/user/CreateUserForm";
import EditUserForm from "../../components/admin/user/EditUserForm";

// Inline helpers
const getRoleLabel = (role) => (role === "ADMIN" ? "Administrateur" : "Utilisateur");
const getRoleColor = (role) => (role === "ADMIN" ? "bg-orange" : "bg-vert");
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list"); // list, create, edit
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await userService.getAllUsers();
    if (result.success) {
      setUsers(result.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      return;
    }
    // const result = await userService.deleteUser(id); // Mock delete
    alert("Delete functionality to be implemented with backend");
    // setUsers(users.filter(u => u.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-12 w-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (view === "create") {
    return (
      <CreateUserForm 
        onSuccess={() => {
            setView("list");
            loadUsers();
        }} 
        onCancel={() => setView("list")} 
      />
    );
  }

  if (view === "edit" && selectedUser) {
    return (
      <EditUserForm 
        user={selectedUser} 
        onSuccess={() => {
            setView("list");
            setSelectedUser(null);
            loadUsers();
        }} 
        onCancel={() => {
            setView("list");
            setSelectedUser(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-noir">Utilisateurs</h1>
        <button
          onClick={() => setView("create")}
          className="bg-noir text-blanc px-6 py-3 rounded-full font-regular hover:bg-orange transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Créer un utilisateur
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-vert outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NOM</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Rôle</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Créé le</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                         {user.imageUrl ? (
                          <img
                            src={getImageUrl(user.imageUrl)}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        <span className="font-medium text-noir">
                          {user.firstname} {user.lastname}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-noir ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                              setSelectedUser(user);
                              setView("edit");
                          }}
                          className="p-2 hover:bg-gray-200 rounded-full text-gray-600 hover:text-noir transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 hover:bg-red-50 rounded-full text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
