import { useEffect, useState } from "react";
import { userService } from "../../api/user.service";
// Inline role helpers
const getRoleLabel = (role) => (role === "ADMIN" ? "Administrateur" : "Utilisateur");
const getRoleColor = (role) => (role === "ADMIN" ? "bg-orange" : "bg-vert");
import { getImageUrl } from "../../api/api"; // Moved here

// Inline formatDate for now
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
import {
  Users,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { guestbookService } from "../../api/guestbook.service";
import { galleryService } from "../../api/gallery.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersResult, messages, images] = await Promise.all([
          userService.getAllUsers(),
          guestbookService.getPendingMessages(), // or getAllApprovedMessages if we want total
          galleryService.getAllImages(),
        ]);

        if (usersResult.success) setUsers(usersResult.data);
        if (Array.isArray(messages)) setMessagesCount(messages.length);
        if (Array.isArray(images)) setImagesCount(images.length);

      } catch (e) {
        console.error("Error loading stats", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-12 w-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalUsers = users.filter((user) => user.role === "USER").length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;

  const recentUsers = [...users]
    .sort(
      (userA, userB) =>
        new Date(userB.createdAt || 0) -
        new Date(userA.createdAt || 0)
    )
    .slice(0, 7);

  const statCards = [
    {
      label: "Utilisateurs",
      value: totalUsers,
      icon: Users,
      color: "bg-beige1",
    },
    {
      label: "Messages en attente",
      value: messagesCount,
      icon: MessageSquare,
      color: "bg-vert",
    },
    {
        label: "Photos Galerie",
        value: imagesCount,
        icon: ImageIcon,
        color: "bg-violet",
    }
  ];

  const usersData = {
    labels: ["Utilisateur", "Administrateur"],
    datasets: [
      {
        data: [totalUsers, totalAdmins],
        backgroundColor: ["#D3F26A", "#FF4F01"],
        borderWidth: 0,
      },
    ],
  };

  const usersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-noir mb-2">Tableau de bord</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-blanc rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-noir" />
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-semibold text-noir mb-1">
                    {card.value}
                  </div>
                  <div className="text-sm text-gray-600">{card.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        <div className="bg-blanc rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-regular text-noir mb-4">
            Répartition des utilisateurs
          </h3>
          <div className="text-3xl font-semibold text-noir mb-4">
            {users.length}
          </div>
          <div className="h-48 mb-4">
            <Doughnut data={usersData} options={usersOptions} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-vert"></div>
              <span className="text-sm text-gray-600">Utilisateur {totalUsers}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange"></div>
              <span className="text-sm text-gray-600">
                Administrateur {totalAdmins}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-blanc rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-noir mb-2">
            Utilisateurs récents
          </h3>
          <p className="text-sm text-noir mb-4">Nouveaux inscrits</p>
          <div className="overflow-x-auto bg-blanc">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    NOM
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Rôle
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Créé le
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {user.imageUrl ? (
                          <img
                            src={getImageUrl(user.imageUrl)}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="h-4 w-4 text-gray-500" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-noir">
                          {user.firstname} {user.lastname} <br/>
                          <span className="text-xs text-gray-500">{user.email}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-noir ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-noir">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
