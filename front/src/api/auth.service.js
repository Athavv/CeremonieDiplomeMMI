import api from "./api";

const register = async (email, password, role) => {
  const response = await api.post('/auth/register', { email, password, role });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

const changePassword = async (newPassword) => {
  const response = await api.post('/auth/change-password', { newPassword });
  return response.data;
};

export const authService = {
  register,
  login,
  changePassword,
};
