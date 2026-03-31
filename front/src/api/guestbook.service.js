import api from "./api";

const getAllMessages = async () => {
    const response = await api.get('/public/guestbook');
    return response.data;
};

const postMessage = async (message) => {
    const response = await api.post('/public/guestbook', message);
    return response.data;
};

const getAllMessagesAdmin = async () => {
    const response = await api.get('/guestbook');
    return response.data;
};

const deleteMessage = async (id) => {
    await api.delete(`/guestbook/${id}`);
};

export const guestbookService = {
    getAllMessages,
    postMessage,
    getAllMessagesAdmin,
    deleteMessage
};
