import React, { useState, useEffect } from 'react';
import { guestbookService } from '../api/guestbook.service';
import { galleryService } from '../api/gallery.service';

import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
    const [tab, setTab] = useState('guestbook'); // 'guestbook' or 'gallery' or 'users'
    const [pendingMessages, setPendingMessages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [newImage, setNewImage] = useState({ url: '', caption: '' });
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'USER' });
    const { register } = useAuth();

    useEffect(() => {
        if (tab === 'guestbook') fetchPendingMessages();
        if (tab === 'gallery') fetchGalleryImages();
    }, [tab]);

    const fetchPendingMessages = async () => {
        try {
            const data = await guestbookService.getPendingMessages();
            setPendingMessages(data);
        } catch (err) { console.error(err); }
    };

    const approveMessage = async (id) => {
        await guestbookService.approveMessage(id);
        fetchPendingMessages();
    };

    const deleteMessage = async (id) => {
        await guestbookService.deleteMessage(id);
        fetchPendingMessages();
    };

    const fetchGalleryImages = async () => {
        const data = await galleryService.getAllImages();
        setGalleryImages(data);
    };

    const handleAddImage = async (e) => {
        e.preventDefault();
        await galleryService.addImage(newImage);
        setNewImage({ url: '', caption: '' });
        fetchGalleryImages();
    };

    const handleDeleteImage = async (id) => {
        await galleryService.deleteImage(id);
        fetchGalleryImages();
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        await register(newUser.username, newUser.password, newUser.role);
        alert('Utilisateur créé');
        setNewUser({ username: '', password: '', role: 'USER' });
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-dark)' }}>

            <div className="container" style={{ padding: '4rem 2rem' }}>
                <h1 style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Administration</h1>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button 
                        className="btn-primary" 
                        style={{ background: tab === 'guestbook' ? 'var(--secondary)' : 'var(--glass)' }}
                        onClick={() => setTab('guestbook')}
                    >
                        Modération Livre d'Or
                    </button>
                    <button 
                        className="btn-primary" 
                        style={{ background: tab === 'gallery' ? 'var(--secondary)' : 'var(--glass)' }}
                        onClick={() => setTab('gallery')}
                    >
                        Gestion Galerie
                    </button>
                    <button 
                        className="btn-primary" 
                        style={{ background: tab === 'users' ? 'var(--secondary)' : 'var(--glass)' }}
                        onClick={() => setTab('users')}
                    >
                        Utilisateurs
                    </button>
                </div>

                <div className="card">
                    {tab === 'guestbook' && (
                        <div>
                            <h3>Messages en attente ({pendingMessages.length})</h3>
                            <div style={{ marginTop: '1rem' }}>
                                {pendingMessages.map(msg => (
                                    <div key={msg.id} style={{ 
                                        padding: '1rem', 
                                        borderBottom: '1px solid var(--glass-border)',
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <p><strong>{msg.author}</strong>: {msg.content}</p>
                                            <small className="text-muted">{new Date(msg.createdAt).toLocaleString()}</small>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button onClick={() => approveMessage(msg.id)} style={{ color: '#00C851', background: 'transparent' }}>Approuver</button>
                                            <button onClick={() => deleteMessage(msg.id)} style={{ color: '#ff4444', background: 'transparent' }}>Supprimer</button>
                                        </div>
                                    </div>
                                ))}
                                {pendingMessages.length === 0 && <p className="text-muted">Aucun message à modérer.</p>}
                            </div>
                        </div>
                    )}

                    {tab === 'gallery' && (
                        <div>
                            <h3>Ajouter une photo</h3>
                            <form onSubmit={handleAddImage} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <input 
                                    placeholder="URL de l'image" 
                                    value={newImage.url} 
                                    onChange={e => setNewImage({...newImage, url: e.target.value})}
                                    style={{ flex: 1, padding: '0.5rem' }} 
                                />
                                <input 
                                    placeholder="Légende" 
                                    value={newImage.caption} 
                                    onChange={e => setNewImage({...newImage, caption: e.target.value})}
                                    style={{ flex: 1, padding: '0.5rem' }} 
                                />
                                <button type="submit" className="btn-primary">Ajouter</button>
                            </form>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                                {galleryImages.map(img => (
                                    <div key={img.id} style={{ position: 'relative' }}>
                                        <img src={img.url} alt={img.caption} style={{ width: '100%', borderRadius: '8px' }} />
                                        <button 
                                            onClick={() => handleDeleteImage(img.id)}
                                            style={{ 
                                                position: 'absolute', top: 5, right: 5, 
                                                background: 'red', color: 'white', 
                                                padding: '0.2rem 0.5rem', borderRadius: '4px' 
                                            }}
                                        >X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tab === 'users' && (
                        <div>
                            <h3>Créer un utilisateur</h3>
                            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                                <input 
                                    placeholder="Identifiant" 
                                    value={newUser.username} 
                                    onChange={e => setNewUser({...newUser, username: e.target.value})}
                                    style={{ padding: '0.5rem' }} 
                                />
                                <input 
                                    type="password"
                                    placeholder="Mot de passe" 
                                    value={newUser.password} 
                                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                                    style={{ padding: '0.5rem' }} 
                                />
                                <select 
                                    value={newUser.role} 
                                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                                    style={{ padding: '0.5rem' }}
                                >
                                    <option value="USER">Etudiant</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                <button type="submit" className="btn-primary">Créer</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
