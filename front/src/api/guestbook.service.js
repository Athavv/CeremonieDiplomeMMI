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
    const response = await api.get('/admin/guestbook/pending');
    return response.data;
};

const approveMessage = async (id) => {
    await api.put(`/admin/guestbook/${id}/approve`);
};

const deleteMessage = async (id) => {
    await api.delete(`/admin/guestbook/${id}`); // supports both admin and potential public delete endpoint
};

export const guestbookService = {
    getAllApprovedMessages,
    postMessage,
    getPendingMessages,
    approveMessage,
    deleteMessage
};
