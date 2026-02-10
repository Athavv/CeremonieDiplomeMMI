import React, { useState, useEffect, useRef } from 'react';
import { guestbookService } from '../api/guestbook.service';
import Navbar from '../components/Navbar';
import { Camera, RefreshCw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'; 

const MESSAGES_PER_PAGE = 3;

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [paginatedMessages, setPaginatedMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const [newMessage, setNewMessage] = useState({ author: '', content: '' });
    const [submitted, setSubmitted] = useState(false);
    
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        return () => {
            stopCamera(); 
        };
    }, []);

    useEffect(() => {
        const total = Math.ceil(messages.length / MESSAGES_PER_PAGE);
        setTotalPages(total || 1);
        
        const page = Math.min(currentPage, total || 1);
        if (page !== currentPage) setCurrentPage(page);

        const start = (page - 1) * MESSAGES_PER_PAGE;
        setPaginatedMessages(messages.slice(start, start + MESSAGES_PER_PAGE));
    }, [messages, currentPage]);

    const fetchMessages = async () => {
        try {
            const data = await guestbookService.getAllApprovedMessages();
            setMessages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Impossible d'accéder à la caméra. Vérifiez vos permissions.");
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const imageDataUrl = canvas.toDataURL('image/png');
            setCapturedImage(imageDataUrl);
            stopCamera();
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        startCamera();
    };

    const deletePhoto = () => {
        setCapturedImage(null);
        stopCamera();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const messageToSend = { ...newMessage };
            if (capturedImage) {
                messageToSend.image = capturedImage; 
            }
            
            await guestbookService.postMessage(messageToSend);
            setSubmitted(true);
            setNewMessage({ author: '', content: '' });
            setCapturedImage(null);
            setTimeout(() => setSubmitted(false), 5000); 
            fetchMessages();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'radial-gradient(circle, #2c3e50 0%, #000 100%)', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="book-container animate-fade-in" style={{ paddingBottom: '2rem' }}>
                    
                    <div className="book-page left" style={{ color: '#4a3b2a', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid #d4af37', paddingBottom: '0.5rem', display: 'inline-block' }}>
                            Laissez une trace
                        </h2>
                        
                        {submitted ? (
                            <div style={{ 
                                padding: '2rem', 
                                border: '2px dashed #d4af37', 
                                borderRadius: '10px', 
                                textAlign: 'center',
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }}>
                                <h3 style={{ color: '#8B4513', fontFamily: 'Dancing Script', fontSize: '2rem' }}>Merci !</h3>
                                <p>Votre plume a été ajoutée à notre histoire.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
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
                                
                                <div style={{ minHeight: '150px' }}>
                                    {!isCameraOpen && !capturedImage && (
                                        <button 
                                            type="button" 
                                            onClick={startCamera}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                border: '1px dashed #8B4513',
                                                background: 'rgba(139, 69, 19, 0.1)',
                                                color: '#8B4513',
                                                fontFamily: 'Playfair Display',
                                                cursor: 'pointer',
                                                borderRadius: '8px',
                                                margin: '0.5rem 0'
                                            }}
                                        >
                                            <Camera size={20} />
                                            Ajouter une photo (Caméra)
                                        </button>
                                    )}

                                    {isCameraOpen && (
                                        <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '2px solid #8B4513' }}>
                                            <video 
                                                ref={videoRef} 
                                                autoPlay 
                                                playsInline 
                                                style={{ width: '100%', display: 'block' }}
                                            />
                                            <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                <button 
                                                    type="button"
                                                    onClick={takePhoto}
                                                    style={{ 
                                                        background: 'white', 
                                                        color: 'black', 
                                                        borderRadius: '50%', 
                                                        width: '50px', 
                                                        height: '50px', 
                                                        border: '4px solid rgba(0,0,0,0.2)',
                                                        cursor: 'pointer'
                                                    }}
                                                    title="Prendre la photo"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={stopCamera}
                                                    style={{ 
                                                        background: 'rgba(0,0,0,0.5)', 
                                                        color: 'white', 
                                                        border: 'none', 
                                                        padding: '5px 10px', 
                                                        borderRadius: '5px' 
                                                    }}
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {capturedImage && (
                                        <div style={{ position: 'relative', display: 'inline-block', border: '5px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transform: 'rotate(-2deg)' }}>
                                            <img src={capturedImage} alt="Capture" style={{ maxWidth: '100%', maxHeight: '200px', display: 'block' }} />
                                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', display: 'flex', gap: '5px' }}>
                                                <button 
                                                    type="button" 
                                                    onClick={retakePhoto}
                                                    style={{ background: '#2c3e50', color: 'white', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}
                                                    title="Reprendre"
                                                >
                                                    <RefreshCw size={16} />
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={deletePhoto}
                                                    style={{ background: '#c0392b', color: 'white', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontFamily: 'Playfair Display', fontWeight: 'bold', marginBottom: '0.5rem' }}>Votre message :</label>
                                    <textarea 
                                        value={newMessage.content}
                                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                                        style={{ 
                                            width: '100%', 
                                            flex: 1,
                                            minHeight: '100px',
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

                    <div className="book-page right" style={{ color: '#4a3b2a', maxHeight: '700px', position: 'relative' }}>
                        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                            Mots Doux
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', paddingBottom: '3rem' }}>
                            {paginatedMessages.length === 0 ? (
                                <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.6 }}>Le livre est encore vierge... Soyez le premier !</p>
                            ) : (
                                paginatedMessages.map((msg, index) => (
                                    <div key={msg.id} style={{ 
                                        paddingBottom: '1.5rem', 
                                        borderBottom: index !== paginatedMessages.length - 1 ? '1px solid rgba(139, 69, 19, 0.2)' : 'none'
                                    }}>
                                        {msg.image && (
                                            <div style={{ 
                                                marginBottom: '1rem', 
                                                display: 'flex', 
                                                justifyContent: 'center',
                                                transform: `rotate(${Math.random() * 4 - 2}deg)`
                                            }}>
                                                <div style={{ padding: '5px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                                    <img src={msg.image} alt="Souvenir" style={{ maxWidth: '100%', maxHeight: '150px', display: 'block' }} />
                                                </div>
                                            </div>
                                        )}
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
                        
                        <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                            <button 
                                onClick={() => handlePageChange('prev')} 
                                disabled={currentPage === 1}
                                style={{ background: 'transparent', border: 'none', cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.3 : 1 }}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <span style={{ fontFamily: 'Playfair Display' }}>Page {currentPage} / {totalPages}</span>
                            <button 
                                onClick={() => handlePageChange('next')} 
                                disabled={currentPage === totalPages}
                                style={{ background: 'transparent', border: 'none', cursor: currentPage === totalPages ? 'default' : 'pointer', opacity: currentPage === totalPages ? 0.3 : 1 }}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Guestbook;
