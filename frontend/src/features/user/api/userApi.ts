import apiClient from '../../../api/client';
import { User, CreateUserPayload, UpdateUserPayload, UserListParams } from '../types/user.types';

export const userApi = {
  /**
   * Fetches the user list (Admin/Super Admin only)
   */
  async getUsers(params?: UserListParams): Promise<User[]> {
    const response = await apiClient.get('/users', { params });
    return response.data.data;
  },

  /**
   * Fetches the current user's profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get('/users/me');
    return response.data.data;
  },

  /**
   * Registers/Creates a new user account
   */
  async createUser(payload: CreateUserPayload): Promise<User> {
    const response = await apiClient.post('/users/register', payload);
    return response.data.data;
  },

  /**
   * Updates an existing user's details
   */
  async updateUser(_id: string, payload: UpdateUserPayload): Promise<User> {
    // If updating self, could also use PATCH /users/me depending on API design
    const response = await apiClient.patch(`/users/me`, payload);
    return response.data.data;
  },

  /**
   * Deletes a user account (Super Admin only)
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};

export default userApi;
