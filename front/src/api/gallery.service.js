import api from "./api";

const getAllImages = async () => {
    const response = await api.get('/gallery');
    return response.data;
};

const addImage = async (image) => {
    const response = await api.post('/gallery', image);
    return response.data;
};

const deleteImage = async (id) => {
    await api.delete(`/gallery/${id}`);
};

export const galleryService = {
    getAllImages,
    addImage,
    deleteImage
};
