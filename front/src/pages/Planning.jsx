import React from 'react';

const Planning = () => {
    return (
        <div className="bg-[#071341] py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 text-white px-8 md:px-14">
                <div className="py-6 md:col-span-5">
                    <p className="mb-2 text-[#B8AB38]">CÉRÉMONIE 2025</p>
                    <h1 className="mb-2 md:text-5xl text-3xl font-bold">
                        PLANNING <br />DE LA SOIRÉE
                    </h1>
                    <div className="w-36 h-[3px] bg-white mt-3"></div>
                    <p className="mt-5 md:w-[80%] text-justify font-poppins uppercase">
                        Un formulaire rapide pour nous indiquer votre présence et celle de vos invités. Ces informations nous aideront à organiser la cérémonie, le cocktail et l'accueil de manière optimale.
                    </p>
               <div className='mt-7'>
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSfx9eY1uR7xvrWalybG_hfuRhDxxuDWq58wPN_3XzMQAWpL5A/viewform?usp=dialog"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 px-6 py-2 bg-white text-black font-medium uppercase hover:bg-[#B8AB38] hover:text-[#071341] transition-colors"
  >
    Confirmer ma présence
  </a>
</div>
                </div>
                <div className="py-5 md:py-16 md:col-span-7">
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-2 text-[#B8AB38] font-serif italic text-xl">18H30 - L’arrivée des diplômés</h2>
                            <p className="text-white text-sm text-justify md:ml-16">
                                L’objectif est de faire revenir les anciens étudiants, qu’ils puissent profiter de ces moments pour se revoir.
                            </p>
                            <div className="w-full h-[1px] bg-white/20 mt-4"></div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-[#B8AB38] font-serif italic text-xl">19H30 - L’installation des invités dans la salle</h2>
                            <p className="text-white text-sm text-justify md:ml-16">
                                Le but est de rassembler tous les étudiants, les proches, et l’équipe pédagogique dans la salle de théâtre, pour se préparer à la remise des diplômes.
                            </p>
                            <div className="w-full h-[1px] bg-white/20 mt-4"></div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-[#B8AB38] font-serif italic text-xl">20h00 - Début de la cérémonie de remise des diplômes</h2>
                            <p className="text-white text-sm text-justify md:ml-16">
                                La cérémonie débutera par un mot de bienvenue du directeur du site de Meaux, suivi de l'équipe pédagogique et des parrains/marraines. Le chef du département effectuera ensuite la remise des diplômes en main propre.
                            </p>
                            <div className="w-full h-[1px] bg-white/20 mt-4"></div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-[#B8AB38] font-serif italic text-xl">21H00 - Ouverture du cocktail dinatoire</h2>
                            <p className="text-white text-sm text-justify md:ml-16">
                                Un coin photo sera mis en place pour immortaliser la cérémonie ainsi qu’un coin restauration : amuses-bouches et boissons seront mis à disposition. À partir du cocktail dinatoire, les invités pourront circuler librement.
                            </p>
                            <div className="w-full h-[1px] bg-white/20 mt-4"></div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-[#B8AB38] font-serif italic text-xl">23H00 - Fin de la cérémonie</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Planning;
