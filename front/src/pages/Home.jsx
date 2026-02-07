import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div style={{ paddingTop: '80px', backgroundColor: '#0a192f', color: '#fff' }}>
            <Navbar />
            
            {/* Header Section */}
            <header style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '4rem 2rem',
                position: 'relative',
                background: `linear-gradient(rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.9)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                {/* Logo Placeholder */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '3rem' }}>❖</span> Université <br/> Gustave Eiffel
                    </div>
                </div>

                <h1 className="animate-fade-in" style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    Cérémonie de Diplôme - MMI
                </h1>
                
                <p className="animate-fade-in" style={{ 
                    fontSize: '1.2rem', 
                    color: '#a8b2d1',
                    letterSpacing: '0.2em',
                    marginBottom: '4rem',
                    animationDelay: '0.2s',
                    textTransform: 'uppercase'
                }}>
                    Promotion 2022 - 2025
                </p>

                {/* 3 Header Placeholders */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{
                            height: '150px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '5px',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }} />
                    ))}
                </div>
            </header>

            {/* Blue Section - Lorentz Ipsum */}
            <section style={{ backgroundColor: '#050a18', padding: '6rem 2rem', borderTop: '1px solid #1e2d3d' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                                LOREM IPSUM LOREM IPSUM <br/> LOREM IPSUM LOREM
                            </h2>
                            <div style={{ width: '100px', height: '4px', backgroundColor: 'var(--secondary)', marginBottom: '2rem' }}></div>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px', color: '#8892b0', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.
                            </p>
                            <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.8rem 2rem', marginTop: '1rem' }}>EN SAVOIR +</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Large Image Section */}
            <section style={{ height: '600px', overflow: 'hidden' }}>
                <img 
                    src="https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt="Graduation Caps"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </section>

            {/* Squares & Stats Section */}
            <section style={{ padding: '8rem 2rem', backgroundColor: '#f8f9fa', color: '#0a192f' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                        {/* Left: Overlapping Squares */}
                        <div style={{ flex: 1, minWidth: '300px', position: 'relative', height: '500px' }}>
                             <div style={{
                                 position: 'absolute',
                                 top: '0',
                                 right: '0',
                                 width: '250px',
                                 height: '250px',
                                 backgroundColor: '#0a192f',
                                 zIndex: 1
                             }}></div>
                             <div style={{
                                 position: 'absolute',
                                 bottom: '50px',
                                 left: '0',
                                 width: '300px',
                                 height: '400px',
                                 backgroundColor: '#0a192f',
                                 zIndex: 2,
                                 border: '5px solid #fff'
                             }}></div>
                        </div>

                        {/* Right: Content */}
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#0a192f' }}>
                                LOREM IPSUM
                            </h2>
                            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '3rem' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                            
                            <div style={{ display: 'flex', gap: '4rem' }}>
                                {[1, 2].map((i) => (
                                    <div key={i}>
                                        <h3 style={{ fontSize: '3.5rem', color: '#d4af37', marginBottom: '0.5rem' }}>12</h3>
                                        <p style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>LOREM IPSUM</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ marginTop: '3rem', width: '200px', height: '50px', backgroundColor: '#0a192f' }}></div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Timeline Section */}
             <section style={{ padding: '6rem 2rem', backgroundColor: '#f0f2f5', color: '#0a192f', textAlign: 'center' }}>
                <div className="container">
                    <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '1rem' }}>Catégorie / Description</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>
                        LOREM IPSUM LOREM IPSUM <br/> LOREM IPSUM LOREM
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                        {[
                            { num: 1, title: 'Lorem ipsum', sub: 'ipsum' },
                            { num: 2, title: 'Lorem ipsum', sub: 'ipsum' },
                            { num: 3, title: 'Lorem ipsum', sub: 'ipsum' },
                            { num: 4, title: 'Lorem ipsum', sub: 'ipsum' }
                        ].map((item) => (
                            <div key={item.num} style={{ background: '#fff', padding: '0', transition: 'transform 0.3s' }}>
                                <div style={{ height: '200px', background: '#e0e0e0', marginBottom: '1.5rem' }}>
                                    {/* Placeholder Image */}
                                    <img src={`https://placehold.co/400x300?text=${item.num}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '0 1.5rem 2rem' }}>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.num}</h3>
                                    <h4 style={{ fontStyle: 'italic', marginBottom: '0.5rem', fontFamily: 'Playfair Display' }}>{item.title}</h4>
                                    <p style={{ fontWeight: 'bold' }}>{item.sub}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                                        LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Large Image Section with Overlay Text */}
            <section style={{ 
                position: 'relative', 
                height: '500px', 
                background: `url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat` 
            }}>
                <div style={{ 
                    position: 'absolute', 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: '10%'
                }}>
                    <div style={{ color: '#fff', textAlign: 'right', maxWidth: '500px' }}>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Lorem ipsum ipsum</p>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>LOREM IPSUM</h2>
                        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                            LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM
                        </p>
                        <button style={{ 
                            background: 'transparent', 
                            border: '1px solid #fff', 
                            color: '#fff', 
                            padding: '1rem 3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            Voir plus
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Icons Section */}
            <section style={{ backgroundColor: '#0a192f', padding: '4rem 2rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} style={{ 
                                border: '1px solid rgba(255,255,255,0.2)', 
                                padding: '2rem', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1rem' 
                            }}>
                                <div style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '50%', 
                                    border: '1px solid #d4af37',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#d4af37'
                                }}>
                                    {/* Icon Placeholder */}
                                    <span>★</span>
                                </div>
                                <div>
                                    <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>... LOREM IPSUM</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#8892b0' }}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Footer */}
            <footer style={{ backgroundColor: '#020c1b', padding: '4rem 2rem', textAlign: 'center', color: '#8892b0' }}>
                 <p>&copy; 2025 Cérémonie de Diplôme MMI - Université Gustave Eiffel</p>
            </footer>
        </div>
    );
};

export default Home;
