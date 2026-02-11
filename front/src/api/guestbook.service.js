import api from "./api";

const getAllApprovedMessages = async () => {
    const response = await api.get('/public/guestbook');
    return response.data;
};

const postMessage = async (message) => {
    const response = await api.post('/public/guestbook', message);
    return response.data;
};

const getPendingMessages = async () => {
    const response = await api.get('/guestbook');
    return response.data;
};

const approveMessage = async (id) => {
    // Auto-approved now, keeping for compatibility if needed or removing
    // await api.put(`/admin/guestbook/${id}/approve`);
};

const deleteMessage = async (id) => {
    await api.delete(`/guestbook/${id}`);
};

export const guestbookService = {
    getAllApprovedMessages,
    postMessage,
    getPendingMessages,
    approveMessage,
    deleteMessage
};
