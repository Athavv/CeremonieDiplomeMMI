import React, { useState, useEffect, useRef } from 'react';
import { guestbookService } from '../api/guestbook.service';
import api, { getImageUrl } from '../api/api';
import { Camera, RefreshCw, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicWaveButton from '../components/common/DynamicWaveButton';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ firstName: '', lastName: '', content: '' });
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [page, setPage] = useState(1);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const messagesPerPage = 6;

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
    };

    const topSlideVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    const leftSlideVariants = {
        hidden: { opacity: 0, x: -100, scale: 0.9 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 10 } }
    };

    const rightSlideVariants = {
        hidden: { opacity: 0, x: 100, rotateY: 30, scale: 0.9 },
        visible: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
    };

    const cardCascadeVariants = (index) => ({
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: (index % 6) * 0.15, type: "spring", stiffness: 80 } }
    });

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await guestbookService.getAllMessages();
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCamera = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            alert("Impossible d'accéder à la caméra.");
            setShowCamera(false);
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            const MAX_WIDTH = 320;
            const scale = MAX_WIDTH / videoRef.current.videoWidth;
            canvasRef.current.width = MAX_WIDTH;
            canvasRef.current.height = videoRef.current.videoHeight * scale;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.4);
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

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeString });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!newMessage.firstName || !newMessage.lastName || !newMessage.content) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        try {
            let uploadedImageId = null;

            if (capturedImage) {
                const blob = dataURItoBlob(capturedImage);
                const formData = new FormData();
                formData.append('file', blob, 'guestbook-photo.jpg');
                const uploadResponse = await api.post('/files/upload/gallery', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedImageId = uploadResponse.data;
            }

            const messageToSend = {
                author: `${newMessage.firstName} ${newMessage.lastName}`,
                content: newMessage.content,
                image: uploadedImageId
            };

            await guestbookService.postMessage(messageToSend);
            alert("Message envoyé !");
            loadMessages();
            setNewMessage({ firstName: '', lastName: '', content: '' });
            setCapturedImage(null);
        } catch (error) {
            alert("Erreur lors de l'envoi.");
        }
    };

    const displayedMessages = messages.slice(0, page * messagesPerPage);

    return (
        <div className="min-h-screen pt-20 bg-[#071341] overflow-x-hidden" style={{ perspective: "1500px" }}>

            <motion.div
                className="bg-[#071341] text-white pb-16 md:px-32 px-5 relative"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={topSlideVariants} className="max-w-7xl mx-auto px-4 md:px-16 pt-12 pb-8 text-center md:text-left z-20 relative">
                    <h1 className="text-3xl md:text-5xl font-serif text-[#ffffff] uppercase tracking-wide border-b-4 border-[#ffffff] inline-block pb-2">
                        Le Livre d'Or
                    </h1>
                </motion.div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-96 h-96"></div>
                    <div className="absolute top-40 -left-20 w-72 h-72"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">

                    <motion.div variants={topSlideVariants} className="text-center mb-16 space-y-2">
                        <h2 className="font-serif italic text-4xl mb-2">Laissez une trace.</h2>
                        <p className="uppercase tracking-[0.2em] text-sm text-[#B8AB38]">CÉRÉMONIE DE REMISE DES DIPLÔMES</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

                        <motion.div variants={leftSlideVariants} className="bg-white p-8 md:p-10 shadow-2xl relative text-gray-800">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8AB38] via-transparent to-[#B8AB38]"></div>
                            <h3 className="text-[#B8AB38] text-center font-serif text-xl uppercase tracking-widest mb-10 border-b border-gray-100 pb-4">
                                Le Livre d'Or Numérique
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols gap-6">
                                    <div className="space-y-1">
                                        <input type="text" value={newMessage.lastName} onChange={(e) => setNewMessage({ ...newMessage, lastName: e.target.value })} className="w-full border-b py-2 text-[#071341] placeholder:text-gray-300 placeholder:font-serif placeholder:italic focus:border-[#071341] focus:outline-none transition-colors bg-transparent font-poppins" placeholder="Votre nom" />
                                    </div>
                                    <div className="space-y-1">
                                        <input type="text" value={newMessage.firstName} onChange={(e) => setNewMessage({ ...newMessage, firstName: e.target.value })} className="w-full border-b py-2 text-[#071341] placeholder:text-gray-300 placeholder:font-serif placeholder:italic focus:border-[#071341] focus:outline-none transition-colors bg-transparent font-poppins" placeholder="Votre prénom" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <textarea value={newMessage.content} onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })} className="w-full border-b py-2 text-[#071341] placeholder:text-gray-300 placeholder:font-serif placeholder:italic focus:border-[#071341] focus:outline-none transition-colors bg-transparent resize-none h-24 font-poppins font-normal" placeholder="Écrivez votre message ici..." />
                                </div>

                                <div className="pt-2">
                                    {!showCamera && !capturedImage && (
                                        <button type="button" onClick={handleCamera} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#071341] transition-colors">
                                            <Camera className="h-4 w-4" />Ajouter une photo souvenir
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
                                            <button type="button" onClick={() => setCapturedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                    <canvas ref={canvasRef} className="hidden"></canvas>
                                </div>

                                <div className="mt-8 font-poppins">
                                    <button type="submit" className="w-full p-0 border-none bg-transparent">
                                        <DynamicWaveButton
                                            className="w-full py-4 bg-[#071341] text-white font-medium uppercase tracking-[0.2em] text-sm hover:!bg-[#B8AB38] hover:!text-[#071341] transition-colors"
                                            baseBg="bg-[#071341]"
                                            hoverBg="bg-[#B8AB38]"
                                            baseText="text-white"
                                            hoverText="text-[#071341]"
                                        >
                                            Envoyer le message
                                        </DynamicWaveButton>
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        <motion.div variants={rightSlideVariants} className="bg-white p-8 md:p-10 shadow-2xl flex flex-col justify-between border-t-4 border-[#B8AB38] text-gray-800">
                            <div>
                                <h3 className="text-[#B8AB38] text-center font-serif text-xl uppercase tracking-widest mb-10 border-b border-gray-100 pb-4">À Propos</h3>
                                <div className="text-gray-600 text-justify leading-relaxed space-y-4 font-light">
                                    <p>Félicitations aux diplômés de la promotion MMI ! Cette cérémonie marque la fin d'un chapitre et le début d'une nouvelle aventure.</p>
                                    <p>Ce livre d'or numérique est votre espace. Partagez vos meilleurs souvenirs, vos anecdotes de cours, vos remerciements aux professeurs et vos vœux de réussite pour vos camarades.</p>
                                    <p>N'hésitez pas à immortaliser l'instant avec une photo directement depuis cette page. Vos messages resteront gravés comme témoignage de ces années inoubliables.</p>
                                </div>
                            </div>
                            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                                <p className="text-[#071341] font-serif italic text-lg mb-4">"Le succès est la somme de petits efforts."</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className="py-20 px-6 bg-[#F9F9F9]">
                <div className="max-w-7xl mx-auto">
                    {messages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedMessages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    variants={cardCascadeVariants(index)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "100px" }}
                                    onClick={() => setSelectedMessage(message)}
                                    className="group cursor-pointer bg-[#071341] p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(7,19,65,0.4)]"
                                >
                                    <div className="absolute inset-0 border border-[#B8AB38]/10 m-2 group-hover:m-0 pointer-events-none group-hover:border-[#B8AB38]/50 transition-all duration-500"></div>
                                    <div className="relative z-10 w-full">
                                        <div className="flex justify-between items-start mb-6 w-full">
                                            <div className="opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:rotate-12 transform">
                                                <ImageIcon className="h-8 w-8 text-[#B8AB38]" />
                                            </div>
                                            {message.image && (
                                                <div className="h-16 w-16 rounded-lg overflow-hidden border border-[#B8AB38]/50 group-hover:border-[#B8AB38] shadow-lg bg-black">
                                                    <img
                                                        src={getImageUrl(message.image)}
                                                        alt="Souvenir"
                                                        onError={(event) => { event.target.style.display = 'none'; }}
                                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-125"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-300 font-light leading-relaxed italic text-lg line-clamp-4 overflow-hidden group-hover:text-white transition-colors duration-300">
                                            "{message.content}"
                                        </p>
                                    </div>
                                    <div className="relative z-10 flex items-end justify-between mt-6 pt-6 border-t border-white/10 group-hover:border-[#B8AB38]/30 transition-colors duration-300">
                                        <span className="text-[#B8AB38] font-serif uppercase tracking-widest text-sm group-hover:scale-105 origin-left transition-transform duration-300">
                                            — {message.author}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-md font-light">Soyez le premier à laisser un message !</p>
                        </div>
                    )}

                    {messages.length > displayedMessages.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mt-16 flex justify-center"
                        >
                            <div onClick={() => setPage(prev => prev + 1)}>
                                <DynamicWaveButton
                                    className="px-8 py-3 bg-transparent text-[#071341] border border-[#071341] uppercase tracking-widest hover:bg-[#071341] hover:text-white"
                                    baseBg="bg-transparent"
                                    hoverBg="bg-[#071341]"
                                    baseText="text-[#071341]"
                                    hoverText="text-white"
                                >
                                    <div className="flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4" />
                                        Charger plus de messages
                                    </div>
                                </DynamicWaveButton>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selectedMessage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMessage(null)}
                            className="absolute inset-0 bg-[#071341]/90 backdrop-blur-md cursor-zoom-out"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-10 w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {selectedMessage.image && (
                                <div className="md:w-1/2 bg-black h-64 md:h-auto relative flex items-center justify-center overflow-hidden">
                                    <img
                                        src={getImageUrl(selectedMessage.image)}
                                        alt="Souvenir"
                                        onError={(event) => { event.target.style.display = 'none'; }}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}

                            <div className={`p-8 md:p-14 flex flex-col justify-center ${selectedMessage.image ? 'md:w-1/2' : 'w-full'} bg-[#071341] text-white overflow-y-auto`}>
                                <div className="mb-6 opacity-30">
                                    <ImageIcon className="h-12 w-12 text-[#B8AB38]" />
                                </div>
                                <p className="font-light leading-relaxed italic text-xl md:text-3xl mb-8">
                                    "{selectedMessage.content}"
                                </p>
                                <div className="pt-6 border-t border-[#B8AB38]/50 mt-auto">
                                    <span className="text-[#B8AB38] font-serif uppercase tracking-widest text-lg md:text-xl">
                                        — {selectedMessage.author}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Guestbook;
