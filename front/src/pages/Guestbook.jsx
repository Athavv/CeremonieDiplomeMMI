import React, { useState, useEffect } from 'react';
import { guestbookService } from '../api/guestbook.service';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ author: '', content: '' });
    const [submitted, setSubmitted] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await guestbookService.getAllApprovedMessages();
            setMessages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await guestbookService.postMessage(newMessage);
            setSubmitted(true);
            setNewMessage({ author: '', content: '' });
            setTimeout(() => setSubmitted(false), 5000); // Reset message after 5s
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'radial-gradient(circle, #2c3e50 0%, #000 100%)', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="book-container animate-fade-in">
                    
                    {/* Page de Gauche : Formulaire */}
                    <div className="book-page left" style={{ color: '#4a3b2a' }}>
                        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #d4af37', paddingBottom: '0.5rem', display: 'inline-block' }}>
                            Laissez une trace
                        </h2>
                        <p style={{ fontStyle: 'italic', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                            "Votre présence et vos mots rendent cette cérémonie inoubliable. Écrivez un souvenir, un vœu ou une pensée..."
                        </p>

                        {!user ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                border: '1px dashed #d4af37',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(255,255,255,0.2)'
                            }}>
                                <p style={{ marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>
                                    Vous devez être connecté pour signer le livre d'or.
                                </p>
                                <Link to="/login" style={{
                                    display: 'inline-block',
                                    padding: '0.8rem 2rem',
                                    background: '#8B4513',
                                    color: '#f4e4bc',
                                    textDecoration: 'none',
                                    borderRadius: '30px',
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 'bold'
                                }}>
                                    Se connecter
                                </Link>
                            </div>
                        ) : submitted ? (
                            <div style={{ 
                                padding: '2rem', 
                                border: '2px dashed #d4af37', 
                                borderRadius: '10px', 
                                textAlign: 'center',
                                backgroundColor: 'rgba(212, 175, 55, 0.1)'
                            }}>
                                <h3 style={{ color: '#8B4513', fontFamily: 'Dancing Script', fontSize: '2rem' }}>Merci !</h3>
                                <p>Votre plume a été ajoutée à notre histoire.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontFamily: 'Playfair Display', fontWeight: 'bold', marginBottom: '0.5rem' }}>De la part de :</label>
                                    <input 
                                        type="text" 
                                        value={newMessage.author}
                                        onChange={(e) => setNewMessage({...newMessage, author: e.target.value})}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.5rem', 
                                            border: 'none', 
                                            borderBottom: '2px solid #8B4513', 
                                            background: 'transparent',
                                            fontFamily: 'Dancing Script',
                                            fontSize: '1.5rem',
                                            outline: 'none',
                                            color: '#2c3e50'
                                        }}
                                        placeholder="Votre nom..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontFamily: 'Playfair Display', fontWeight: 'bold', marginBottom: '0.5rem' }}>Votre message :</label>
                                    <textarea 
                                        value={newMessage.content}
                                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                                        style={{ 
                                            width: '100%', 
                                            minHeight: '150px',
                                            padding: '1rem', 
                                            border: '1px solid #d4af37', 
                                            background: 'rgba(255,255,255,0.3)',
                                            borderRadius: '5px',
                                            fontFamily: 'Dancing Script',
                                            fontSize: '1.2rem',
                                            outline: 'none',
                                            color: '#2c3e50',
                                            lineHeight: '1.6'
                                        }}
                                        placeholder="Écrivez ici..."
                                        required
                                    />
                                </div>
                                <button type="submit" style={{ 
                                    alignSelf: 'flex-start',
                                    padding: '0.8rem 2rem',
                                    background: '#8B4513',
                                    color: '#f4e4bc',
                                    border: 'none',
                                    borderRadius: '30px',
                                    fontFamily: 'Playfair Display',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
                                }}>
                                    ✑ Signer
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Page de Droite : Messages */}
                    <div className="book-page right" style={{ color: '#4a3b2a', maxHeight: '700px', overflowY: 'auto' }}>
                        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                            Mots Doux
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {messages.length === 0 ? (
                                <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.6 }}>Le livre est encore vierge... Soyez le premier !</p>
                            ) : (
                                messages.map((msg, index) => (
                                    <div key={msg.id} style={{ 
                                        paddingBottom: '1.5rem', 
                                        borderBottom: index !== messages.length - 1 ? '1px solid rgba(139, 69, 19, 0.2)' : 'none'
                                    }}>
                                        <p style={{ 
                                            fontFamily: 'Dancing Script', 
                                            fontSize: '1.4rem', 
                                            lineHeight: '1.4', 
                                            marginBottom: '0.5rem' 
                                        }}>
                                            "{msg.content}"
                                        </p>
                                        <div style={{ textAlign: 'right', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                            — <strong>{msg.author}</strong>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {/* Numéro de page simulé */}
                        <div style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '0.8rem', opacity: 0.5 }}>
                            Page {Math.floor(Math.random() * 100) + 1}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Guestbook;
