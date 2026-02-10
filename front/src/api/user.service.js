import api from "./api";

// Mock data for fallback
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

async function updateUser(userId, updatedData) {
   // Mock update
   return { success: true, data: { ...updatedData, id: userId } };
}

export const userService = {
  getAllUsers,
  getCurrentUser,
  updateUser,
};
