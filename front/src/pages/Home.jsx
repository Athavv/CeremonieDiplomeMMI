import React from 'react';



const Home = () => {
   return (
       <div className='uppercase'>
         <div className="w-full h-[100vh] bg-cover bg-center" style={{ backgroundImage: "url('/home.jpg')" }}>



               <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
                   <img src="/logogustaveeiffel.png" className="w-[250px]" style={{ maxWidth: "400px" }} />
                   <h1 className="text-3xl md:text-4xl mt-5 font-playfair">
                       Cérémonie de Remise des Diplômes - MMI
                   </h1>
                   <p className="text-xl max-w-2xl mt-5 font-poppins">PROMOTION 2022 - 2025</p>
               </div>
           </div>
           <div className="bg-[#071341] pt-20 pb-20 md:pb-60 relative">
               <img src="/image2.jpg" className="absolute left-1/2 -translate-x-1/2 md:-bottom-56 -bottom-24 w-[300px] md:w-[900px]" />
               <div className="grid grid-cols-1 md:grid-cols-12 text-white md:px-14 px-8">
                   <div className="py-6 md:col-span-7">
                       <p className="mb-2 text-[#B8AB38]">CÉRÉMONIE 2025</p>
                       <h1 className="mb-2 md:text-5xl text-[23px]">
                           VOTRE DIPLÔME VOUS ATTEND - CÉLÉBRONS ENSEMBLE VOTRE SUCCÈS
                       </h1>
                       <div className="w-24 h-[3px] bg-white mt-3"></div>
                   </div>
                   <div className="py-5 md:py-16 md:col-span-5">
                       <p className="mb-2 w-[100%] text-justify font-poppins">Vous avez franchi la ligne d'arrivée avec succès. Venez célébrer votre diplôme entouré de vos proches, de l'équipe pédagogique et de vos camarades de promotion. Une soirée spéciale vous attend avec remise officielle des diplômes, photo de promo et cocktail dinatoire. Consultez le planning détaillé pour tout savoir sur le déroulement de la soirée.</p>
                       <button className="mt-4 px-6 py-2 bg-white text-black font-regular">
                           VOIR LE PLANNING
                       </button>
                   </div>
               </div>
           </div>
           <div className=" px-8 md:px-20 bg-white md:pt-80 pt-40">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                   <div>
                       <p className="text-[#B8AB38] font-regular mb-2 text-sm">GALERIE PHOTO (PROCHAINEMENT)</p>
                       <h2 className="text-3xl md:text-4xl font-playfair mb-4">
                           Tous vos souvenirs <br />au même endroit
                       </h2>
                       <p className="text-gray-700 font-poppins mb-6 text-justify">La soirée de remise des diplômes sera capturée par notre photographe officiel. Retrouvez ici toutes les photos de la cérémonie, des discours, du lancé de chapeaux et du cocktail. Téléchargez vos clichés préférés, partagez-les avec vos proches et conservez ces moments précieux qui resteront gravés dans votre mémoire pour toujours.</p>
                       <button className="px-6 py-3 bg-[#071341] text-white font-regular uppercase">
                           VOIR GALERIE PHOTO (PROCHAINEMENT)
                       </button>
                   </div>
                   <div>
                       <img src="/chiffreimage.png" alt="Illustration" className="md:w-[60%] mx-auto" />
                   </div>
               </div>
           </div>
           <div className="mt-14 md:py-16 bg-white text-center">
               <p className="mx-auto text-[#B8AB38] font-poppins text-sm">LES MOMENTS CLÉS</p>
               <h2 className="text-3xl md:text-4xl px-10 text-[#071341] ">Quatre moments, une soirée inoubliable</h2>
           </div>
           <div className="bg-white px-10 mt-10 md=mt-0">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                   <div className="flex flex-col items-center text-center relative">
                       <img src="/accueilretrouvail.png" className="w-70 h-70 object-cover mb-6 border-[#B8AB38] border-4" />
                       <h3 className="text-3xl font-playfair mb-2">1</h3>
                       <p className="font-regular text-[#071341] mb-2">Accueil & Retrouvailles</p>
                       <p className="text-gray-700 font-poppins text-sm px-5">
                           Retrouvez vos camarades de promo et les anciens étudiants dès 18h30. Un moment convivial pour se remémorer les meilleurs souvenirs.
                       </p>
                       <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-[#071341]"></div>
                   </div>
                   <div className="flex flex-col items-center text-center relative">
                       <img src="/remisedesdiplomes.png" className="w-70 h-70 object-cover mb-6 border-[#B8AB38] border-4" />
                       <h3 className="text-3xl font-playfair mb-2">2</h3>
                       <p className="font-regular text-[#071341] mb-2">Remise des Diplômes
                       </p>
                       <p className="text-gray-700 font-poppins text-sm px-5">
                           Montez sur scène pour recevoir votre diplôme devant vos proches. Photo de promo et lancé de chapeaux au programme.
                       </p>
                       <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-[#071341]"></div>
                   </div>
                   <div className="flex flex-col items-center text-center relative">
                       <img src="/discoursettemoignanges.png" className="w-70 h-70 object-cover mb-6 border-[#B8AB38] border-4" />
                       <h3 className="text-3xl font-playfair mb-2">3</h3>
                       <p className="font-regular text-[#071341] mb-2">Discours & Témoignages</p>
                       <p className="text-gray-700 font-poppins text-sm px-5">Écoutez les interventions du directeur, de l'équipe pédagogique et du major de promo. Des mots qui marqueront cette étape importante.</p>
                       <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-[#071341]"></div>
                   </div>
                   <div className="flex flex-col items-center text-center">
                       <img src="/cocktaildinatoire.png" className="w-70 h-70 object-cover mb-6 border-[#B8AB38] border-4" />
                       <h3 className="text-3xl font-playfair mb-2">4</h3>
                       <p className="font-regular text-[#071341] mb-2">Cocktail Dinatoire</p>
                       <p className="text-gray-700 font-poppins text-sm px-5">
                           Prolongez la fête autour d'un cocktail avec amuse-bouches et boissons. Coin photo disponible pour immortaliser ces moments.
                       </p>
                   </div>
               </div>
           </div>
           <div className="w-full h-[80vh]  md:h-[70vh] bg-cover bg-center relative mt-20" style={{ backgroundImage: "url('/fondiutmeaux.png')" }}>
               <div className="relative h-full flex items-center md:justify-end px-10 md:px-20 text-white md:text-right">
                   <div className="w-[100%] md:w-[50%]">
                       <p className="text-sm font-poppins mb-2">Vous écrivez l'histoire</p>
                       <h2 className="text-3xl md:text-4xl font-playfair mb-4">Une première pour MMI Meaux <br /></h2>
                       <p className="font-poppins text-justify">
                        Pour la première fois, l'IUT de Meaux organise une cérémonie de remise des diplômes exclusivement dédiée aux étudiants MMI. Vous êtes la promotion pionnière de cet événement qui marquera l'histoire de la filière sur le site de Meaux. Un moment unique et symbolique qui célèbre non seulement votre réussite, mais aussi la reconnaissance de l'excellence de la formation MMI au sein de notre établissement.
                       </p>
                   </div>
               </div>
           </div>
           <div className="py-10 px-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="md:flex items-start gap-6 bg-[#0A1A55] p-6">
                       <img src="/photo.png" className="w-20 h-20 object-contain" />
                       <div>
                           <h3 className="text-white text-2xl font-playfair mb-2 mt-3">Galerie Photo</h3>
                           <p className="text-gray-300 font-poppins text-sm text-justify md:text-left">Toutes les photos de la soirée disponibles ici. Téléchargez, partagez et conservez ces souvenirs mémorables de votre diplôme.</p>
                       </div>
                   </div>
                   <div className="md:flex items-start gap-6 bg-[#0A1A55] p-6">
                       <img src="/livretdor.png" className="w-20 h-20 object-contain" />
                       <div>
                           <h3 className="text-white text-2xl font-playfair mb-2 mt-3">Livret d'Or
                           </h3>
                           <p className="text-gray-300 font-poppins text-sm text-justify md:text-left">
                               Signez le livret d'or de la promotion. Laissez votre trace et lisez les messages de vos camarades et enseignants.
                           </p>
                       </div>
                   </div>
               </div>
           </div>
           <div className="px-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="md:flex items-start gap-6 bg-[#0A1A55] p-6">
                       <img src="/video.png" className="w-20 h-20 object-contain" />
                       <div>
                           <h3 className="text-white text-2xl font-playfair mb-2 mt-3">
                               Vidéo Souvenir
                           </h3>
                           <p className="text-gray-300 font-poppins text-sm text-justify md:text-left">
                               Replongez dans l'ambiance de la soirée avec la vidéo récap. Revivez les temps forts en images et en émotions.
                           </p>
                       </div>
                   </div>
                   <div className="flex items-start gap-6 bg-[#0A1A55] p-6">
                       <img src="/icon2.png" className="w-16 h-16 object-contain"/>
                       <div>
                           <h3 className="text-white text-2xl font-playfair mb-2">Lorem ipsum</h3>
                           <p className="text-gray-300 font-poppinstext-sm">
                               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                               Praesent libero. Sed cursus ante dapibus diam.
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
};


export default Home;