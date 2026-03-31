import React from 'react';
import { motion } from 'framer-motion';
import DynamicWaveButton from '../components/common/DynamicWaveButton';

const Planning = () => {
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const leftSlideVariants = {
        hidden: { opacity: 0, x: -150, scale: 0.8 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 10 }
        }
    };

    const rightSlideVariants = {
        hidden: { opacity: 0, x: 150, rotateY: 45, scale: 0.8 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    const lineDrawVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: { scaleX: 1, opacity: 1, transition: { duration: 1.2, ease: "circOut" } }
    };

    const scheduleItems = [
        { time: "18H30 - L'arrivée des diplômés", desc: "L'objectif est de faire revenir les anciens étudiants, qu'ils puissent profiter de ces moments pour se revoir." },
        { time: "19H30 - L'installation des invités dans la salle", desc: "Le but est de rassembler tous les étudiants, les proches, et l'équipe pédagogique dans la salle de théâtre, pour se préparer à la remise des diplômes." },
        { time: "20H00 - Début de la cérémonie de remise des diplômes", desc: "La cérémonie débutera par un mot de bienvenue du directeur du site de Meaux, suivi de l'équipe pédagogique et des parrains/marraines. Le chef du département effectuera ensuite la remise des diplômes en main propre." },
        { time: "21H00 - Ouverture du cocktail dinatoire", desc: "Un coin photo sera mis en place pour immortaliser la cérémonie ainsi qu'un coin restauration : amuses-bouches et boissons seront mis à disposition. À partir du cocktail dinatoire, les invités pourront circuler librement." },
        { time: "23H00 - Fin de la cérémonie", desc: "" }
    ];

    return (
        <div className="bg-[#071341] py-20 min-h-screen" style={{ perspective: "1500px" }}>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-12 text-white px-8 md:px-14 gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="py-6 md:col-span-5">
                    <motion.p variants={leftSlideVariants} className="mb-2 text-[#B8AB38]">
                        CÉRÉMONIE 2025
                    </motion.p>

                    <motion.h1 variants={leftSlideVariants} className="mb-2 md:text-5xl text-3xl font-bold">
                        PLANNING <br />DE LA SOIRÉE
                    </motion.h1>

                    <motion.div variants={lineDrawVariants} className="w-36 h-[3px] bg-white mt-3 origin-left"></motion.div>

                    <motion.p variants={leftSlideVariants} className="mt-5 md:w-[80%] text-justify font-poppins uppercase">
                        Un formulaire rapide pour nous indiquer votre présence et celle de vos invités. Ces informations nous aideront à organiser la cérémonie, le cocktail et l'accueil de manière optimale.
                    </motion.p>

                    <motion.div variants={leftSlideVariants} className='mt-7'>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfx9eY1uR7xvrWalybG_hfuRhDxxuDWq58wPN_3XzMQAWpL5A/viewform?usp=dialog"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DynamicWaveButton className="mt-4 px-8 py-4 bg-white text-black font-medium uppercase transition-colors hover:bg-[#B8AB38] hover:text-[#071341] shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                                Confirmer ma présence
                            </DynamicWaveButton>
                        </a>
                    </motion.div>
                </div>

                <div className="py-5 md:py-16 md:col-span-7">
                    <div className="space-y-8">
                        {scheduleItems.map((item, index) => (
                            <motion.div key={index} variants={rightSlideVariants} className="group">
                                <h2 className="mb-2 text-[#B8AB38] font-serif italic text-xl group-hover:-translate-y-1 transition-transform duration-300">
                                    {item.time}
                                </h2>

                                {item.desc && (
                                    <p className="text-white text-sm text-justify md:ml-16 group-hover:text-gray-300 transition-colors">
                                        {item.desc}
                                    </p>
                                )}

                                <motion.div
                                    variants={lineDrawVariants}
                                    className="w-full h-[1px] bg-white/20 mt-4 origin-left group-hover:bg-[#B8AB38] group-hover:scale-y-150 transition-all duration-300">
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Planning;
