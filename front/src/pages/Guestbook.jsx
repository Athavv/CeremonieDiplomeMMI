import React, { useState, useEffect, useRef } from 'react';
import { guestbookService } from '../api/guestbook.service';
import { getImageUrl } from '../api/api';
import { Camera, RefreshCw, Trash2, ChevronLeft, ChevronRight, Send, Image as ImageIcon } from 'lucide-react';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState({ firstName: '', lastName: '', content: '' });
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [page, setPage] = useState(1);
    const messagesPerPage = 6; 

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await guestbookService.getApprovedMessages();
            setMessages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCamera = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Impossible d'accéder à la caméra.");
            setShowCamera(false);
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const dataUrl = canvasRef.current.toDataURL('image/jpeg');
            setCapturedImage(dataUrl);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.firstName || !newMessage.lastName || !newMessage.content) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        try {
            const messageToSend = {
                author: `${newMessage.firstName} ${newMessage.lastName}`,
                content: newMessage.content,
                image: capturedImage
            };
            
            await guestbookService.postMessage(messageToSend);
            alert("Message envoyé ! Il sera visible après validation.");
            setNewMessage({ firstName: '', lastName: '', content: '' });
            setCapturedImage(null);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'envoi.");
        }
    };

    const displayedMessages = messages.slice(0, page * messagesPerPage);

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-sans pt-20">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-5xl font-serif text-[#071341] uppercase tracking-wide border-b-4 border-[#071341] inline-block pb-2 mb-8">
                    Le Livre d'Or
                </h1>
            </div>

            {/* Hero / Form Section */}
            <div className="bg-[#071341] text-white py-16 px-6 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                     <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#B8AB38] rounded-full blur-3xl"></div>
                     <div className="absolute top-40 -left-20 w-72 h-72 bg-[#ffffff] rounded-full blur-3xl opacity-20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-2">
                        <h2 className="font-serif italic text-4xl mb-2">Laissez une trace.</h2>
                        <p className="uppercase tracking-[0.2em] text-sm text-[#B8AB38]">CÉRÉMONIE DE REMISE DES DIPLÔMES</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        {/* Form Card */}
                        <div className="bg-white p-8 md:p-10 shadow-2xl relative text-gray-800">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8AB38] via-transparent to-[#B8AB38]"></div>

                             <h3 className="text-[#B8AB38] text-center font-serif text-xl uppercase tracking-widest mb-10 border-b border-gray-100 pb-4">
                                Le Livre d'Or Numérique
                             </h3>
                             
                             <form onSubmit={handleSubmit} className="space-y-6">
                                 <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Nom</label>
                                        <input 
                                            type="text"
                                            value={newMessage.lastName}
                                            onChange={(e) => setNewMessage({...newMessage, lastName: e.target.value})}
                                            className="w-full border-b border-gray-300 py-2 text-gray-800 placeholder-gray-300 focus:border-[#071341] focus:outline-none transition-colors bg-transparent"
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Prénom</label>
                                        <input 
                                            type="text"
                                            value={newMessage.firstName}
                                            onChange={(e) => setNewMessage({...newMessage, firstName: e.target.value})}
                                            className="w-full border-b border-gray-300 py-2 text-gray-800 placeholder-gray-300 focus:border-[#071341] focus:outline-none transition-colors bg-transparent"
                                            placeholder="Votre prénom"
                                        />
                                    </div>
                                 </div>

                                 <div className="space-y-1">
                                    <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Message</label>
                                    <textarea 
                                        value={newMessage.content}
                                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                                        className="w-full border-b border-gray-300 py-2 text-gray-800 placeholder-gray-300 focus:border-[#071341] focus:outline-none transition-colors bg-transparent resize-none h-24"
                                        placeholder="Écrivez votre message ici..."
                                    />
                                 </div>

                                 {/* Camera / Photo Section */}
                                 <div className="pt-2">
                                     {!showCamera && !capturedImage && (
                                         <button 
                                            type="button" 
                                            onClick={handleCamera}
                                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#071341] transition-colors"
                                         >
                                             <Camera className="h-4 w-4" />
                                             Ajouter une photo souvenir
                                         </button>
                                     )}

                                     {showCamera && (
                                         <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
                                             <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                                             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                                                 <button type="button" onClick={takePhoto} className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-lg z-20">
                                                     <Camera className="h-6 w-6" />
                                                 </button>
                                                 <button type="button" onClick={stopCamera} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg z-20">
                                                     <Trash2 className="h-6 w-6" />
                                                 </button>
                                             </div>
                                         </div>
                                     )}

                                     {capturedImage && (
                                         <div className="relative w-32 h-32 mt-2 group">
                                             <img src={capturedImage} alt="Captured" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                             <button 
                                                type="button" 
                                                onClick={() => setCapturedImage(null)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                             >
                                                 <Trash2 className="h-3 w-3" />
                                             </button>
                                         </div>
                                     )}
                                     <canvas ref={canvasRef} className="hidden"></canvas>
                                 </div>

                                 <button 
                                    type="submit" 
                                    className="w-full bg-[#071341] text-white py-4 uppercase tracking-[0.2em] hover:bg-[#B8AB38] hover:text-[#071341] transition-all duration-300 font-medium text-sm mt-8 border border-[#071341]"
                                 >
                                     Envoyer le message
                                 </button>
                             </form>
                        </div>

                        {/* Info/About Card */}
                        <div className="bg-white p-8 md:p-10 shadow-2xl flex flex-col justify-between border-t-4 border-[#B8AB38] text-gray-800">
                            <div>
                                <h3 className="text-[#B8AB38] text-center font-serif text-xl uppercase tracking-widest mb-10 border-b border-gray-100 pb-4">
                                    À Propos
                                </h3>
                                <div className="text-gray-600 text-justify leading-relaxed space-y-4 font-light">
                                    <p>
                                        Félicitations aux diplômés de la promotion MMI ! Cette cérémonie marque la fin d'un chapitre et le début d'une nouvelle aventure.
                                    </p>
                                    <p>
                                        Ce livre d'or numérique est votre espace. Partagez vos meilleurs souvenirs, vos anecdotes de cours, vos remerciements aux professeurs et vos vœux de réussite pour vos camarades.
                                    </p>
                                    <p>
                                        N'hésitez pas à immortaliser l'instant avec une photo directement depuis cette page. Vos messages resteront gravés comme témoignage de ces années inoubliables.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                                <p className="text-[#071341] font-serif italic text-lg mb-4">
                                    "Le succès est la somme de petits efforts."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Grid Section */}
            <div className="py-20 px-6 bg-[#F9F9F9]">
                <div className="max-w-7xl mx-auto">
                    {messages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedMessages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className="group bg-[#071341] p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    {/* Gold Border Effect */}
                                    <div className="absolute inset-0 border border-[#B8AB38]/30 m-2 pointer-events-none group-hover:border-[#B8AB38] transition-colors duration-500"></div>
                                    
                                    <div className="relative z-10 w-full">
                                        <div className="flex justify-between items-start mb-6 w-full">
                                            <div className="opacity-30">
                                                 <ImageIcon className="h-8 w-8 text-[#B8AB38]" />
                                            </div>
                                            {msg.image && (
                                                <div className="h-16 w-16 rounded-lg overflow-hidden border border-[#B8AB38] shadow-lg">
                                                    <img 
                                                        src={getImageUrl(msg.image)} 
                                                        alt="Souvenir" 
                                                        className="w-full h-full object-cover transform transition-transform group-hover:scale-110" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-300 font-light leading-relaxed italic text-lg line-clamp-4 overflow-hidden">
                                            "{msg.content}"
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-end justify-between mt-6 pt-6 border-t border-white/10">
                                        <span className="text-[#B8AB38] font-serif uppercase tracking-widest text-sm">
                                             — {msg.author}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-xl font-light">Soyez le premier à laisser un message !</p>
                        </div>
                    )}

                    {/* Pagination / Load More */}
                    {messages.length > displayedMessages.length && (
                        <div className="text-center mt-16">
                            <button 
                                onClick={() => setPage(prev => prev + 1)}
                                className="inline-flex items-center gap-2 bg-transparent text-[#071341] border border-[#071341] px-8 py-3 uppercase tracking-widest hover:bg-[#071341] hover:text-white transition-all duration-300"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Charger plus de messages
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Guestbook;
