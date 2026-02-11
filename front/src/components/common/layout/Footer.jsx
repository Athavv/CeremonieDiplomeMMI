export default function Footer() {
   return (
       <footer className="bg-[#071341] text-white py-12 px-6">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">


               <div className="text-center md:text-left">
                   <img src="/logouge.png" className="w-20 mx-auto md:mx-0 mb-4" />
                   <p className="text-gray-300 text-sm leading-relaxed">
                       Cérémonie MMI Meaux–
                       Outils et ressources pour célébrer la réussite des étudiants.
                   </p>
               </div>


               <div className="text-center md:text-left uppercase">
                   <p className="mb-4">Lien du site</p>
                   <ul className="flex flex-col gap-2 text-gray-300 text-sm">
                       <li><a href="/">Accueil</a></li>
                       <li><a href="/planning">Planning</a></li>
                       <li><a href="/lorem1">Galerie photo</a></li>
                       <li><a href="/lorem2">Livret d'or</a></li>
                       <li><a href="/admin">Accès Admin</a></li>
                   </ul>
               </div>


               <div className="text-center md:text-left uppercase">
                   <p className="mb-4">Coordonées</p>
                   <ul className="flex flex-col gap-2 text-gray-300 text-sm">
                       <li>
                           <a href="https://maps.app.goo.gl/45YgjqyrjQ67f1U58" target="_blank">
                               ADRESSE : 10 Rue Winston Churchill, 77100 Meaux
                           </a>
                       </li>
                       <li><a href="tel:+33768058507">TÉLÉPHONE : 07 68 05 85 07</a></li>
                       <li><a href="mailto:saffanasalaoudine@gmail.com">EMAIL : saffanasalaoudine@gmail.com</a></li>
                   </ul>
               </div>
           </div>
           <div className="text-xs text-gray-400 mt-10 flex justify-between items-center px-10">
               <p>© 2026 Cérémonie MMI – Université Gustave Eiffel</p>
               <p className="cursor-pointer hover:underline">
                   Politique de confidentialité
               </p>
           </div>
       </footer>
   );
}



