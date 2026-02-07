import React, { useState, useEffect } from 'react';
import { galleryService } from '../api/gallery.service';
import Navbar from '../components/Navbar';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await galleryService.getAllImages();
                setImages(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchImages();
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '4rem 2rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--secondary)' }}>
                    Galerie Souvenirs
                </h1>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {images.map((img) => (
                        <div key={img.id} className="card animate-fade-in" style={{ padding: '1rem' }}>
                            <div style={{ 
                                height: '250px', 
                                overflow: 'hidden', 
                                borderRadius: '10px', 
                                marginBottom: '1rem' 
                            }}>
                                <img 
                                    src={img.url} 
                                    alt={img.caption}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{img.caption}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
