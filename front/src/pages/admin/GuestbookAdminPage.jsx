import { useEffect, useState } from "react";
import { guestbookService } from "../../api/guestbook.service";
// Inline formatDate
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
import { Check, Trash2, MessageSquare, ImageIcon } from "lucide-react";

export default function GuestbookAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
        const data = await guestbookService.getPendingMessages();
        setMessages(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await guestbookService.approveMessage(id);
    loadMessages();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce message ?")) {
        await guestbookService.deleteMessage(id);
        loadMessages();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-12 w-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-noir">Modération Livre d'Or</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Auteur</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Message / Photo</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-gray-500" />
                        </div>
                        <span className="font-medium text-noir">
                          {msg.author}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                        <div className="flex flex-col gap-2">
                            <p className="max-w-md truncate" title={msg.content}>{msg.content}</p>
                            {msg.image && (
                                <div className="flex items-center gap-2 text-xs text-blue-600">
                                    <ImageIcon className="h-4 w-4" />
                                    <span>Photo incluse</span>
                                    <img src={msg.image} alt="Aperçu" className="h-10 w-10 object-cover rounded border border-gray-200" />
                                </div>
                            )}
                        </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {formatDate(msg.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(msg.id)}
                          className="p-2 hover:bg-green-50 rounded-full text-gray-600 hover:text-green-600 transition-colors"
                          title="Approuver"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="p-2 hover:bg-red-50 rounded-full text-gray-600 hover:text-red-500 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    Aucun message en attente
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
