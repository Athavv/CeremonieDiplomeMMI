import React, { useState, useEffect } from 'react';
import { galleryService } from '../../api/gallery.service';
import api, { getImageUrl } from '../../api/api';
import { Trash2, Plus, Image as ImageIcon, Upload } from 'lucide-react';

const GalleryAdminPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [newImage, setNewImage] = useState({ caption: '' });
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            setFilePreview(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return null;
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await api.post('/files/upload/gallery', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data; // URL
        } catch (error) {
            console.error("Upload failed", error);
            alert("Erreur lors de l'upload de l'image.");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert("Veuillez sélectionner une image.");
            return;
        }

        setUploading(true);
        let imageUrl = null;

        const uploadedUrl = await handleUpload();
        if (uploadedUrl) {
            imageUrl = uploadedUrl;
        } else {
            setUploading(false);
            return;
        }

        try {
            await galleryService.addImage({ url: imageUrl, caption: newImage.caption });
            setNewImage({ caption: '' });
            setFile(null);
            loadImages();
        } catch (error) {
            console.error("Failed to add image", error);
        } finally {
            setUploading(false);
            setFilePreview(null);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette image ?")) {
            try {
                await galleryService.deleteImage(id);
                loadImages();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-[#071341]">Chargement...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[#071341]">Gestion Galerie</h1>
                <p className="text-gray-500 mt-1">Ajoutez ou supprimez des photos de la galerie</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#071341] mb-4">Ajouter une image</h3>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-sm font-medium text-gray-600 block">Image (Fichier)</label>
                        <div className="flex gap-2 flex-col">
                            <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-gray-600 w-full justify-center">
                                <Upload className="h-4 w-4" />
                                {file ? file.name : "Choisir un fichier"}
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                            {filePreview && (
                                <div className="mt-2 flex justify-center">
                                    <img src={filePreview} alt="Aperçu" className="h-32 w-auto object-cover rounded-lg border border-gray-200 shadow-sm" />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full space-y-2">
                         <label className="text-sm font-medium text-gray-600 block">Légende</label>
                         <input 
                            type="text" 
                            placeholder="Description de la photo" 
                            value={newImage.caption}
                            onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#B8AB38] transition-colors"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={uploading || !file}
                        className="bg-[#071341] text-white px-6 py-2 rounded-lg hover:bg-[#B8AB38] hover:text-[#071341] transition-all duration-300 font-medium flex items-center gap-2 self-end mb-0.5 md:mb-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? "Envoi..." : (
                            <>
                                <Plus className="h-4 w-4" />
                                Ajouter
                            </>
                        )}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <img src={getImageUrl(img.url)} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                            <p className="font-medium mb-4 line-clamp-2">{img.caption || "Sans légende"}</p>
                            <button 
                                onClick={() => handleDelete(img.id)}
                                className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
                {images.length === 0 && (
                     <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                        <p>Aucune photo dans la galerie</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryAdminPage;
