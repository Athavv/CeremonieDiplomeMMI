import React, { useState, useEffect } from 'react';
import { galleryService } from '../api/gallery.service';
import { getImageUrl } from '../api/api';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await galleryService.getAllImages();
                setImages(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'Escape') setSelectedImageIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    const handlePrev = (e) => {
        if(e) e.stopPropagation();
        setSelectedImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        if(e) e.stopPropagation();
        setSelectedImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleDownloadSingle = async (e, img) => {
        e.stopPropagation();
        try {
            const url = getImageUrl(img.url);
            const response = await fetch(url);
            const blob = await response.blob();
            saveAs(blob, `souvenir-${img.id}.jpg`);
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    const handleDownloadAll = async () => {
        if (images.length === 0) return;
        setDownloading(true);
        const zip = new JSZip();
        
        try {
            const promises = images.map(async (img) => {
                const url = getImageUrl(img.url);
                const response = await fetch(url);
                const blob = await response.blob();
                zip.file(`souvenir-${img.id}.jpg`, blob);
            });

            await Promise.all(promises);
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "ceremonie-mmi-photos.zip");
        } catch (error) {
            console.error("Batch download failed", error);
            alert("Erreur lors du téléchargement des photos.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-sans pt-20">
             <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-5xl font-serif text-[#071341] uppercase tracking-wide border-b-4 border-[#071341] inline-block pb-2 mb-8">
                    Galerie Photo
                </h1>
            </div>

            <div className="bg-[#071341] text-white py-16 px-6 relative mb-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8AB38] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h2 className="font-serif italic text-4xl mb-4">Remontez le temps</h2>
                    <p className="max-w-2xl mx-auto text-gray-300 font-light text-lg">
                        Découvrez les moments forts de la cérémonie à travers les yeux de nos photographes et invités.
                    </p>

                    {images.length > 0 && (
                        <div className="mt-8">
                            <button 
                                onClick={handleDownloadAll}
                                disabled={downloading}
                                className="inline-flex items-center gap-2 bg-[#B8AB38] text-[#071341] px-8 py-3 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 font-medium text-sm"
                            >
                                <Download className="h-4 w-4" />
                                {downloading ? "Préparation..." : "Tout télécharger"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="max-w-[1240px] mx-auto px-6 pb-20">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="h-12 w-12 border-4 border-[#B8AB38] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : images.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {images.map((img, index) => (
                            <div 
                                key={img.id} 
                                className="break-inside-avoid relative group overflow-hidden cursor-pointer shadow-xl bg-[#071341]"
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <div className="absolute inset-0 border-2 border-[#B8AB38]/0 group-hover:border-[#B8AB38] z-20 transition-all duration-500 pointer-events-none"></div>
                                
                                <img 
                                    src={getImageUrl(img.url)} 
                                    alt={img.caption || "Souvenir"}
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071341] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between z-10">
                                    <p className="text-white font-serif italic text-lg">{img.caption}</p>
                                    <button 
                                        onClick={(e) => handleDownloadSingle(e, img)}
                                        className="bg-white/10 p-2 rounded-full hover:bg-[#B8AB38] hover:text-[#071341] backdrop-blur-sm transition-colors text-white"
                                        title="Télécharger"
                                    >
                                        <Download className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <ImageIcon className="h-24 w-24 mb-4 opacity-20" />
                        <p className="text-xl font-light">La galerie est vide pour le moment.</p>
                    </div>
                )}
            </div>

            {selectedImageIndex !== null && (
                <div 
                    className="fixed inset-0 z-50 bg-[#071341]/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white/50 hover:text-[#B8AB38] p-2 transition-colors"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <X className="h-10 w-10" />
                    </button>

                    <button 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#B8AB38] p-2 transition-colors"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-12 w-12" />
                    </button>

                    <button 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#B8AB38] p-2 transition-colors"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-12 w-12" />
                    </button>

                    <div 
                        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <img 
                            src={getImageUrl(images[selectedImageIndex].url)} 
                            alt={images[selectedImageIndex].caption}
                            className="max-h-[75vh] max-w-full object-contain shadow-2xl border-4 border-[#B8AB38]"
                        />
                        <div className="w-full mt-6 flex justify-between items-center text-white border-t border-white/10 pt-4">
                            <p className="text-2xl font-serif italic text-[#B8AB38]">{images[selectedImageIndex].caption}</p>
                            <button 
                                onClick={(e) => handleDownloadSingle(e, images[selectedImageIndex])}
                                className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-[#B8AB38] hover:text-[#071341] transition-colors uppercase tracking-widest text-sm"
                            >
                                <Download className="h-4 w-4" />
                                Télécharger
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
