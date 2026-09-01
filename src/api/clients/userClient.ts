import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserClient {
  constructor(private request: APIRequestContext) {}

  async createUser(payload: Record<string, any>): Promise<APIResponse> {
    return this.request.post('/usuarios', { data: payload });
  }

  async getUserById(id: string): Promise<APIResponse> {
    return this.request.get(`/usuarios/${id}`);
  }

  async updateUser(id: string, payload: Record<string, any>): Promise<APIResponse> {
    return this.request.put(`/usuarios/${id}`, { data: payload });
  }

  async deleteUser(id: string): Promise<APIResponse> {
    return this.request.delete(`/usuarios/${id}`);
  }
}