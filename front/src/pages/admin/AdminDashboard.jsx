import React, { useState, useEffect } from 'react';
import { userService } from '../../api/user.service';
import { guestbookService } from '../../api/guestbook.service';
import { galleryService } from '../../api/gallery.service';
import { Users, FileText, Image as ImageIcon, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        pendingMessages: 0,
        approvedMessages: 0,
        images: 0
    });
    const [recentMessages, setRecentMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const usersRes = await userService.getAllUsers();
                const pendingRes = await guestbookService.getPendingMessages();
                const approvedRes = await guestbookService.getAllApprovedMessages();
                const galleryRes = await galleryService.getAllImages();

                setStats({
                    users: usersRes.data.length,
                    pendingMessages: pendingRes.length,
                    approvedMessages: approvedRes.length,
                    images: galleryRes.length
                });

                setRecentMessages(pendingRes.slice(0, 5));
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8AB38]"></div>
            </div>
        );
    }

    const cards = [
        { title: 'Utilisateurs', value: stats.users, icon: Users, color: 'text-[#071341]', bg: 'bg-[#E0E7FF]' },
        { title: 'Messages en attente', value: stats.pendingMessages, icon: Clock, color: 'text-[#B8AB38]', bg: 'bg-[#FFFBEB]' },
        { title: 'Messages validés', value: stats.approvedMessages, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Photos galerie', value: stats.images, icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[#071341] mb-2">Tableau de bord</h1>
                <p className="text-gray-600">Bienvenue sur l'interface d'administration MMI Diplôme.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${card.bg}`}>
                                <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                                <h3 className="text-2xl font-bold text-[#071341]">{card.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-[#071341]">Derniers messages en attente</h3>
                        <span className="text-sm text-[#B8AB38] font-medium cursor-pointer">Voir tout</span>
                    </div>
                    
                    {recentMessages.length > 0 ? (
                        <div className="space-y-4">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-[#071341]">{msg.author}</h4>
                                        <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{msg.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Aucun message en attente de modération.
                        </div>
                    )}
                </div>

                <div className="bg-[#071341] rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">Besoin d'aide ?</h3>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Si vous rencontrez des problèmes avec l'interface d'administration ou si vous avez des questions sur la modération, contactez l'équipe technique.
                        </p>
                        <button className="bg-[#B8AB38] text-[#071341] px-6 py-2 rounded-lg font-semibold hover:bg-white transition-colors">
                            Contacter le support
                        </button>
                    </div>
                    {/* Decorative circle */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#B8AB38] rounded-full opacity-10 blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
