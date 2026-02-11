import api from "./api";


const MOCK_USERS = [
  { id: 1, firstname: "Admin", lastname: "User", email: "admin@test.com", role: "ADMIN", createdAt: new Date().toISOString() },
  { id: 2, firstname: "John", lastname: "Doe", email: "john@test.com", role: "USER", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, firstname: "Jane", lastname: "Smith", email: "jane@test.com", role: "USER", createdAt: new Date(Date.now() - 172800000).toISOString() },
];

async function getAllUsers() {
  try {
    const { data } = await api.get("/users");
    return { success: true, data };
  } catch (error) {
    console.warn("API /users failed, using mock data");
    return { success: true, data: MOCK_USERS };
  }
}

async function getCurrentUser() {
  try {
    const { data } = await api.get("/users/me");
    return { success: true, data };
  } catch (error) {
     return { success: false, error: "User not found" };
  }
}

async function createUser(userData) {
    const { data } = await api.post("/users", userData);
    return { success: true, data };
}

async function updateUser(userId, updatedData) {
    const { data } = await api.put(`/users/${userId}`, updatedData);
    return { success: true, data };
}

async function deleteUser(userId) {
    await api.delete(`/users/${userId}`);
    return { success: true };
}

export const userService = {
  getAllUsers,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser
};
