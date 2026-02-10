import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { userService } from "../../../api/user.service";

export default function EditUserForm({ user, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        role: user.role || "USER",
      });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        submitData.password = formData.password;
      }

      const result = await userService.updateUser(user.id, submitData);
      if (result.success) {
        onSuccess();
      } else {
        alert(result.error || "Erreur");
      }
    } catch (err) {
      alert("Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-noir mb-2">Utilisateurs</h1>
        <h2 className="text-2xl font-semibold text-noir mb-4">
          Modifier un utilisateur
        </h2>
        <p className="text-gray-700 mb-6 w-full">
          Modifiez les informations de l'utilisateur.
        </p>
      </div>

      <div className="space-y-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-noir"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour
        </button>

        <div className="bg-blanc rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-noir mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstname}
                  onChange={(event) =>
                    setFormData({ ...formData, firstname: event.target.value })
                  }
                  className="w-full pt-3 py-2 border-0 border-b border-gray-300 focus:border-vert focus:ring-0 outline-none transition-colors"
                  placeholder="ex. Thomas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-noir mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastname}
                  onChange={(event) =>
                    setFormData({ ...formData, lastname: event.target.value })
                  }
                  className="w-full pt-3 py-2 border-0 border-b border-gray-300 focus:border-vert focus:ring-0 outline-none transition-colors"
                  placeholder="ex. Pesquet"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir mb-2">
                Email
              </label>
              <input
                type="text"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                className="w-full pt-3 py-2 border-0 border-b border-gray-300 focus:border-vert focus:ring-0 outline-none transition-colors"
                placeholder="ex. tpesquet@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-noir mb-2">
                Rôle
              </label>
              <select
                value={formData.role}
                onChange={(event) =>
                  setFormData({ ...formData, role: event.target.value })
                }
                className="w-full pt-3 py-2 border-0 border-b border-gray-300 bg-white appearance-none cursor-pointer focus:border-vert focus:ring-0 outline-none transition-colors"
              >
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </div>

            {formData.password ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-noir mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                    className="w-full pt-3 py-2 border-0 border-b border-gray-300 focus:border-vert focus:ring-0 outline-none transition-colors"
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(event) =>
                      setFormData({ ...formData, confirmPassword: event.target.value })
                    }
                    className="w-full pt-3 py-2 border-0 border-b border-gray-300 focus:border-vert focus:ring-0 outline-none transition-colors"
                    placeholder="Confirmer le mot de passe"
                  />
                </div>
              </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-noir mb-2">
                    Nouveau mot de passe (optionnel)
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                    className="w-full pt-3 py-2 border-0 border-b border-gray-300 focus:border-vert focus:ring-0 outline-none transition-colors"
                    placeholder="Laisser vide pour ne pas changer"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-start pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-noir text-blanc rounded-full hover:bg-vert hover:text-noir font-medium transition-all"
              >
                {loading ? "Modification..." : "Modifier l'utilisateur"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
