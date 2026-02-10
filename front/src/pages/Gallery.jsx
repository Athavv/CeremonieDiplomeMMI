import React, { useState, useEffect } from 'react';
import { galleryService } from '../api/gallery.service';
import Navbar from '../components/Navbar';
import { Image as ImageIcon } from "lucide-react";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
            <Navbar />
            <div className="max-w-[1240px] mx-auto px-6 py-12">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-bold font-poppins text-noir mb-4">
                        Remontez le temps
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Découvrez les moments forts de la cérémonie à travers les yeux de nos photographes et invités.
                    </p>
                    <div className="w-24 h-1 bg-vert mx-auto rounded-full"></div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="h-12 w-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : images.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {images.map((img) => (
                            <div key={img.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer">
                                <img 
                                    src={img.url} 
                                    alt={img.caption || "Souvenir"}
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-medium text-lg">{img.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <ImageIcon className="h-24 w-24 mb-4 opacity-20" />
                        <p className="text-xl">La galerie est vide pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
