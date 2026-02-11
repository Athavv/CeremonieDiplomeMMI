import React, { useState, useEffect } from 'react';
import { userService } from '../../api/user.service';
import { Plus, Search, Trash2, Edit2, ArrowLeft, User } from 'lucide-react';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "USER"
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await userService.getAllUsers();
            if (result.success) {
               setUsers(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            // Implement delete logic if service supports it
            await userService.deleteUser(id);
            loadUsers();
            // alert("Suppression non implémentée dans l'API mockée ou réelle pour l'instant.");
        }
    };

    const [editingId, setEditingId] = useState(null);

    // ...

    const handleCreate = () => {
        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "USER"
        });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setFormData({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            password: "", // Password logic needs care (usually separate or optional), leaving empty for now
            role: "USER"
        });
        setEditingId(user.id);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await userService.updateUser(editingId, formData);
            } else {
                await userService.createUser(formData);
            }
            setShowForm(false);
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredUsers = users.filter(user => 
        (user.firstname + " " + user.lastname).toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-[#071341]">Chargement...</div>;

    if (showForm) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <button 
                    onClick={() => setShowForm(false)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#071341] transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Retour
                </button>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#071341] mb-6">{editingId ? "Modifier l'utilisateur" : "Créer un utilisateur"}</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#071341] mb-2">Prénom</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstname}
                                    onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#B8AB38] transition-colors"
                                    placeholder="Ex: Thomas"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#071341] mb-2">Nom</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastname}
                                    onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#B8AB38] transition-colors"
                                    placeholder="Ex: Pesquet"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#071341] mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#B8AB38] transition-colors"
                                placeholder="Ex: email@exemple.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#071341] mb-2">Mot de passe</label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#B8AB38] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>



                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-[#071341] text-white rounded-xl font-medium hover:bg-[#B8AB38] hover:text-[#071341] transition-all duration-300"
                            >
                                Créer l'utilisateur
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#071341]">Utilisateurs</h1>
                    <p className="text-gray-500 mt-1">Gérez les comptes utilisateurs de la plateforme</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-6 py-3 bg-[#071341] text-white rounded-xl hover:bg-[#B8AB38] hover:text-[#071341] transition-all duration-300 font-medium"
                >
                    <Plus className="h-5 w-5" />
                    Créer un utilisateur
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    className="flex-1 bg-transparent border-none outline-none text-[#071341] placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Utilisateur</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rôle</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date création</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            {user.imageUrl ? (
                                                <img src={user.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#071341]">
                                                    <span className="font-bold text-sm">{(user.firstname?.[0] || 'U') + (user.lastname?.[0] || '')}</span>
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium text-[#071341]">{user.firstname} {user.lastname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            user.role === 'ADMIN' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleEdit(user)}
                                                className="p-2 text-gray-400 hover:text-[#071341] hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Aucun utilisateur trouvé.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
