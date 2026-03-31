import React from 'react';
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import DynamicWaveButton from '../components/common/DynamicWaveButton';

import Marquee from '../components/common/Marquee';

const SplitText = ({ children, delayOffset = 0, className = "" }) => {
    const words = children.split(' ');
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delayOffset * 0.3 } })
    };

    const childVariants = {
        hidden: { opacity: 0, y: 50, rotate: 2 },
        visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
    };

    return (
        <motion.div className={`flex flex-wrap justify-center ${className}`} variants={containerVariants} initial="hidden" animate="visible">
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="overflow-hidden inline-block mr-[0.25em]">
                    <motion.span variants={childVariants} className="inline-block">{word}</motion.span>
                </span>
            ))}
        </motion.div>
    );
};

const RevealImage = ({ src, className, alt = "" }) => {
    return (
        <motion.div 
            className={`relative overflow-hidden ${className}`}
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        >
            <motion.img 
                src={src} alt={alt} 
                className="w-full h-full object-cover origin-bottom"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </motion.div>
    );
};

const Home = () => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 800], ['0%', '40%']);

    const animationConfig = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true, margin: "-50px" }
    };

    return (
        <div className='uppercase overflow-x-hidden'>
            <div className="w-full h-[100vh] relative overflow-hidden bg-black">
                <motion.div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: "url('/home.jpg')", y: heroY, scale: useTransform(scrollY, [0, 800], [1, 1.1]) }} 
                />
                
                <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.img
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: [30, -10, 0] }} 
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0], transition: { duration: 0.5 } }}
                        src="/logogustaveeiffel.png" 
                        className="w-[150px] md:w-[250px] mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer" 
                    />
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-4xl mt-5 font-playfair"
                    >
                        Cérémonie de Remise des Diplômes - MMI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-xl max-w-2xl mt-5 font-playfair"
                    >
                        PROMOTION 2022 - 2025
                    </motion.p>
                </div>
            </div>

            <div className="bg-[#071341] pt-20 pb-20 md:pb-60 relative z-10">
                <motion.div
                    initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                    whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 md:-bottom-56 -bottom-24 w-[300px] md:w-[900px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                >
                    <motion.img
                        initial={{ scale: 1.2 }} 
                        whileInView={{ scale: 1 }} 
                        transition={{ duration: 2, ease: "easeOut" }} 
                        viewport={{ once: true }}
                        src="/image2.jpg" 
                        className="w-full object-cover"
                    />
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-12 text-white md:px-15 lg:px-32 px-8 lg:gap-10">
                    <motion.div {...animationConfig} className="py-6 md:col-span-7 relative">
                        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="mb-4 text-[#B8AB38]">CÉRÉMONIE 2025</motion.p>
                        <h1 className="mb-2 md:text-4xl text-[23px] overflow-hidden">
                            <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }} viewport={{ once: true }} className="block">VOTRE DIPLÔME VOUS ATTEND</motion.span>
                            <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }} viewport={{ once: true }} className="block">CÉLÉBRONS ENSEMBLE VOTRE SUCCÈS</motion.span>
                        </h1>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "96px" }} transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} viewport={{ once: true }} className="h-[3px] bg-white mt-6"></motion.div>
                    </motion.div>
                    <motion.div {...animationConfig} className="py-5 lg:py-16 md:col-span-5">
                        <p className="mb-2 w-[100%] text-justify font-poppins">Vous avez franchi la ligne d'arrivée avec succès. Venez célébrer votre diplôme entouré de vos proches, de l'équipe pédagogique et de vos camarades de promotion. Une soirée spéciale vous attend avec remise officielle des diplômes, photo de promo et cocktail dinatoire. Consultez le planning détaillé pour tout savoir sur le déroulement de la soirée.</p>
                        <Link to="/planning">
                            <DynamicWaveButton 
                                className="mt-4 px-8 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                                baseBg="bg-white"
                                hoverBg="bg-[#B8AB38]"
                                baseText="text-black"
                                hoverText="text-white"
                            >
                                VOIR LE PLANNING
                            </DynamicWaveButton>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="px-8 md:px-15 lg:px-32 bg-white md:pt-80 pt-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div {...animationConfig} className="relative">
                        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="text-[#B8AB38] font-regular mb-4 text-sm tracking-widest">GALERIE PHOTO (PROCHAINEMENT)</motion.p>
                        <h2 className="text-3xl md:text-4xl font-playfair mb-6 overflow-hidden">
                            <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }} viewport={{ once: true }} className="block">Tous vos souvenirs</motion.span>
                            <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }} viewport={{ once: true }} className="block">au même endroit</motion.span>
                        </h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} viewport={{ once: true }} className="text-gray-700 font-poppins mb-8 text-justify leading-relaxed">La soirée de remise des diplômes sera capturée par notre photographe officiel. Retrouvez ici toutes les photos de la cérémonie, des discours, du lancé de chapeaux et du cocktail. Téléchargez vos clichés préférés, partagez-les avec vos proches et conservez ces moments précieux qui resteront gravés dans votre mémoire pour toujours.</motion.p>
                        <Link to="/gallery">
                            <DynamicWaveButton 
                                className="px-6 py-4 shadow-lg inline-block mt-4"
                                baseBg="bg-[#071341]"
                                hoverBg="bg-[#B8AB38]"
                                baseText="text-white"
                                hoverText="text-[#071341]"
                            >
                                VOIR GALERIE PHOTO
                            </DynamicWaveButton>
                        </Link>
                    </motion.div>
                    <div className="w-full overflow-hidden rounded-sm relative group" data-cursor-hover="true" data-cursor-text="SOUVENIR">
                        <motion.div
                            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                        >
                            <RevealImage src="/chiffreimage.png" alt="Illustration" className="md:w-[60%] mx-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div {...animationConfig} className="mt-14 md:pt-16 bg-white text-center">
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} viewport={{ once: true }} className="mx-auto text-[#B8AB38] font-poppins text-sm tracking-widest mb-4">LES MOMENTS CLÉS</motion.p>
                <SplitText delayOffset={0.3} className="text-3xl md:text-4xl px-10 text-[#071341] mb-12">Quatre moments, une soirée inoubliable</SplitText>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"></div>
            
            <div className="bg-white md:px-32 mt-10 md:mt-0 pb-10" style={{ perspective: "1000px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <motion.div {...animationConfig} whileHover={{ y: -15, scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }} className="flex flex-col items-center text-center relative group p-4 transition-all duration-500 rounded-lg" data-cursor-hover="true" data-cursor-text="ÉTAPE 1">
                        <div className="overflow-hidden mb-6 border-[#B8AB38] border-8 w-70 h-70 rounded-sm">
                            <motion.img src="/accueilretrouvail.png" className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-1000 ease-out" />
                        </div>
                        <h3 className="text-5xl font-playfair mb-2 text-[#B8AB38] opacity-50 font-bold drop-shadow-md group-hover:text-[#071341] transition-colors">1</h3>
                        <p className="font-bold text-[#071341] mb-2 uppercase tracking-wide">Accueil & Retrouvailles</p>
                        <p className="text-gray-700 font-poppins text-sm px-5 group-hover:text-black transition-colors">Retrouvez vos camarades de promo et les anciens étudiants dès 18h30. Un moment convivial pour se remémorer les meilleurs souvenirs.</p>
                    </motion.div>
                    <motion.div {...animationConfig} transition={{ delay: 0.1, duration: 0.8 }} whileHover={{ y: -15, scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }} className="flex flex-col items-center text-center relative group p-4 transition-all duration-500 rounded-lg" data-cursor-hover="true" data-cursor-text="ÉTAPE 2">
                        <div className="overflow-hidden mb-6 border-[#B8AB38] border-8 w-70 h-70 rounded-sm">
                            <motion.img src="/remisedesdiplomes.png" className="w-full h-full object-cover group-hover:scale-125 group-hover:-rotate-3 transition-all duration-1000 ease-out" />
                        </div>
                        <h3 className="text-5xl font-playfair mb-2 text-[#B8AB38] opacity-50 font-bold drop-shadow-md group-hover:text-[#071341] transition-colors">2</h3>
                        <p className="font-bold text-[#071341] mb-2 uppercase tracking-wide">Remise des Diplômes</p>
                        <p className="text-gray-700 font-poppins text-sm px-5 group-hover:text-black transition-colors">Montez sur scène pour recevoir votre diplôme devant vos proches. Photo de promo et lancé de chapeaux au programme.</p>
                    </motion.div>
                    <motion.div {...animationConfig} transition={{ delay: 0.2, duration: 0.8 }} whileHover={{ y: -15, scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }} className="flex flex-col items-center text-center relative group p-4 transition-all duration-500 rounded-lg" data-cursor-hover="true" data-cursor-text="ÉTAPE 3">
                        <div className="overflow-hidden mb-6 border-[#B8AB38] border-8 w-70 h-70 rounded-sm">
                            <motion.img src="/discoursettemoignanges.png" className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-1000 ease-out" />
                        </div>
                        <h3 className="text-5xl font-playfair mb-2 text-[#B8AB38] opacity-50 font-bold drop-shadow-md group-hover:text-[#071341] transition-colors">3</h3>
                        <p className="font-bold text-[#071341] mb-2 uppercase tracking-wide">Discours & Témoignages</p>
                        <p className="text-gray-700 font-poppins text-sm px-5 group-hover:text-black transition-colors">Écoutez les interventions du directeur, de l'équipe pédagogique et du major de promo. Des mots qui marqueront cette étape importante.</p>
                    </motion.div>
                    <motion.div {...animationConfig} transition={{ delay: 0.3, duration: 0.8 }} whileHover={{ y: -15, scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }} className="flex flex-col items-center text-center group p-4 transition-all duration-500 rounded-lg" data-cursor-hover="true" data-cursor-text="ÉTAPE 4">
                        <div className="overflow-hidden mb-6 border-[#B8AB38] border-8 w-70 h-70 rounded-sm">
                            <motion.img src="/cocktaildinatoire.png" className="w-full h-full object-cover group-hover:scale-125 group-hover:-rotate-3 transition-all duration-1000 ease-out" />
                        </div>
                        <h3 className="text-5xl font-playfair mb-2 text-[#B8AB38] opacity-50 font-bold drop-shadow-md group-hover:text-[#071341] transition-colors">4</h3>
                        <p className="font-bold text-[#071341] mb-2 uppercase tracking-wide">Cocktail Dinatoire</p>
                        <p className="text-gray-700 font-poppins text-sm px-5 group-hover:text-black transition-colors">Prolongez la fête autour d'un cocktail avec amuse-bouches et boissons. Coin photo disponible pour immortaliser ces moments.</p>
                    </motion.div>
                </div>
            </div>

            <div className="w-full h-[80vh] md:h-[70vh] relative overflow-hidden mt-20">
                <motion.div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: "url('/fondiutmeaux.png')" }} 
                />
                <div className="relative h-full flex items-center md:justify-end px-10 md:px-15 lg:px-32 text-white lg:text-right">
                    <motion.div {...animationConfig} className="w-[100%] lg:w-[50%]">
                        <p className="text-sm font-poppins mb-2">Vous écrivez l'histoire</p>
                        <h2 className="text-3xl md:text-4xl font-playfair mb-4">Une première pour MMI Meaux <br /></h2>
                        <p className="font-poppins text-justify">
                            Pour la première fois, l'IUT de Meaux organise une cérémonie de remise des diplômes exclusivement dédiée aux étudiants MMI. Vous êtes la promotion pionnière de cet événement qui marquera l'histoire de la filière sur le site de Meaux.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="px-5 py-10 md:px-5 lg:px-32">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    <motion.div {...animationConfig} className="md:flex items-start gap-6 bg-[#0A1A55] p-6 hover:bg-[#B8AB38] transition-colors duration-500 group cursor-pointer">
                        <motion.img src="/photo.png" className="w-20 h-20 object-contain group-hover:scale-110 transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
                        <div>
                            <h3 className="text-white group-hover:text-[#071341] text-2xl font-playfair mb-2 mt-3 transition-colors">Galerie Photo</h3>
                            <p className="text-gray-300 group-hover:text-[#071341] font-poppins text-sm text-justify md:text-left transition-colors">Toutes les photos de la soirée disponibles ici.</p>
                        </div>
                    </motion.div>
                    <motion.div {...animationConfig} transition={{ duration: 0.6, delay: 0.2 }} className="md:flex items-start gap-6 bg-[#0A1A55] p-6 mt-8 md:mt-0 hover:bg-[#B8AB38] transition-colors duration-500 group cursor-pointer">
                        <motion.img src="/livretdor.png" className="w-20 h-20 object-contain group-hover:scale-110 transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
                        <div>
                            <h3 className="text-white group-hover:text-[#071341] text-2xl font-playfair mb-2 mt-3 transition-colors">Livret d'Or</h3>
                            <p className="text-gray-300 group-hover:text-[#071341] font-poppins text-sm text-justify md:text-left transition-colors">Signez le livret d'or de la promotion.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="px-5 md:px-5 lg:px-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.div {...animationConfig} className="md:flex items-start gap-6 bg-[#0A1A55] p-6 hover:bg-[#B8AB38] transition-colors duration-500 group cursor-pointer">
                        <motion.img src="/video.png" className="w-20 h-20 object-contain group-hover:scale-110 transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
                        <div>
                            <h3 className="text-white group-hover:text-[#071341] text-2xl font-playfair mb-2 mt-3 transition-colors">Vidéo Souvenir</h3>
                            <p className="text-gray-300 group-hover:text-[#071341] font-poppins text-sm text-justify md:text-left transition-colors">Replongez dans l'ambiance de la soirée avec la vidéo récap.</p>
                        </div>
                    </motion.div>
                    <motion.div {...animationConfig} transition={{ duration: 0.6, delay: 0.2 }} className="md:flex items-start gap-6 bg-[#0A1A55] p-6 hover:bg-[#B8AB38] transition-colors duration-500 group cursor-pointer">
                        <motion.img src="/iconmusic.png" className="w-20 h-20 object-contain group-hover:scale-110 transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
                        <div>
                            <h3 className="text-white group-hover:text-[#071341] text-2xl font-playfair mb-2 mt-3 transition-colors">Playlist</h3>
                            <p className="text-gray-300 group-hover:text-[#071341] font-poppins text-sm text-justify md:text-left transition-colors">Pour garder l'ambiance sonore de la soirée.</p>
                        </div>
                    </motion.div>
                    <div className='mt-5'></div>
                </div>
            </div>

            <div className="bg-[#071341] overflow-hidden relative z-10 w-full" data-cursor-hover="true" data-cursor-text="FIN">
                <Marquee text="• PROMOTION 2025 • MMI MEAUX • EXCELLENCE " outline={true} />
            </div>
        </div>
    );
};
export default Home;
