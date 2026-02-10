import { useEffect, useState } from "react";
import { galleryService } from "../../api/gallery.service";
import { Trash2, Plus, Image as ImageIcon } from "lucide-react";

export default function GalleryAdminPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
        const data = await galleryService.getAllImages();
        setImages(data);
    } catch(err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.url) return;
    await galleryService.addImage(newImage);
    setNewImage({ url: '', caption: '' });
    loadImages();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette image ?")) {
        await galleryService.deleteImage(id);
        loadImages();
    }
  };

  if (loading) {
     return (
       <div className="flex justify-center items-center py-20">
         <div className="h-12 w-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
       </div>
     );
   }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-noir">Gestion Galerie</h1>
      </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-medium mb-4">Ajouter une image</h3>
            <form onSubmit={handleAddImage} className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="URL de l'image" 
                    value={newImage.url}
                    onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vert outline-none"
                />
                <input 
                    type="text" 
                    placeholder="Légende" 
                    value={newImage.caption}
                    onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vert outline-none"
                />
                <button type="submit" className="bg-noir text-blanc px-6 py-2 rounded-lg hover:bg-orange transition-colors flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter
                </button>
            </form>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img) => (
            <div key={img.id} className="relative group bg-white rounded-xl overflow-hidden shadow-sm">
                <img src={img.url} alt={img.caption} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                        onClick={() => handleDelete(img.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-3">
                    <p className="text-sm font-medium text-gray-700 truncate">{img.caption || "Sans légende"}</p>
                </div>
            </div>
        ))}
         {images.length === 0 && (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-500">
                <ImageIcon className="h-12 w-12 mb-2 opacity-20" />
                <p>Aucune image dans la galerie</p>
            </div>
        )}
      </div>
    </div>
  );
}
