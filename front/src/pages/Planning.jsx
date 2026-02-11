import React from 'react';



const Planning = () => {
   return (
       <div className=''>
           <div className="bg-[#071341] pt-20 pb-20">
               <div className="grid grid-cols-1 md:grid-cols-12 text-white md:px-14 px-8">
                   <div className="py-6 md:col-span-5">
                       <p className="mb-2 text-[#B8AB38]">CÉRÉMONIE 2025</p>
                       <h1 className="mb-2 md:text-5xl text-[23px]">
                           PLANNING <br />DE LA SOIRÉE
                       </h1>
                       <div className="w-36 h-[3px] bg-white mt-3"></div>
                       <p className="mt-5 md:w-[80%] text-justify font-poppins uppercase">Un formulaire rapide pour nous indiquer votre présence et celle de vos invités. Ces informations nous aideront à organiser la cérémonie, le cocktail et l'accueil de manière optimale.</p>
                       <button className="mt-4 px-6 py-2 bg-white text-black font-regular">
                           CONFIRMER MA PRÉSENCE
                       </button>
                   </div>
                   <div className="py-5 md:py-16 md:col-span-7">
                       <h2 className="mb-2 text-[#B8AB38] font-playfair italic">18H30 - L’arrivée des diplômés</h2>
                       <p className="mt-2 text-[#ffffff] md:ms-16 text-sm text-justify">L’objectif est de faire revenir les anciens étudiants, qu’ils puissent  profiter de ses 1h pour se revoir.</p>
                       <div className="w-[100%] h-[1px] bg-white mt-4"></div>
                       <h2 className="mt-4 text-[#B8AB38] font-playfair italic">19H30 - L’installation des invités dans la salle</h2>
                       <p className="mt-2 text-[#ffffff] md:ms-16 text-sm text-justify">Le but est de rassembler tout les étudiants, les proches, l’équipe pédagogique dans la salle de théâtre, pour se préparer à la remise des diplômes.</p>
                        <div className="w-[100%] h-[1px] bg-white mt-4"></div>
                         <h2 className="mt-4 text-[#B8AB38] font-playfair italic">20h00 - Début de la cérémonie de remise des diplômes</h2>
                       <p className="mt-2 text-[#ffffff] md:ms-16 text-sm text-justify">La cérémonie sera débutée par un bienvenue souhaité par le directeur du site de Meaux, puis de l'équipe pédagogiques et des parrains/marraines. Le chef du département effectuera ensuite la remise du diplôme en main propre aux diplômés.</p>
                        <div className="w-[100%] h-[1px] bg-white mt-4"></div>
                         <h2 className="mt-4 text-[#B8AB38] font-playfair italic">21H00 - Ouverture du cocktail dinatoire</h2>
                       <p className="mt-2 text-[#ffffff] md:ms-16 text-sm text-justify">Un coin photo sera mis en place pour immortaliser la cérémonie ainsi qu’un coin restauration : amuses-bouches et boissons seront mis à disposition autour de différentes tables mange-debout. À partir du cocktail dinatoire, les gens pourront quitter la cérémonie.</p>
                        <div className="w-[100%] h-[1px] bg-white mt-4"></div>
                       <h2 className="mt-4 text-[#B8AB38] font-playfair italic">23H00 - Fin de la cérémonie</h2>
                   </div>
               </div>
           </div>
       </div>
   );
};


export default Planning;



