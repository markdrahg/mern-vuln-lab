import apiClient from "../api/client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

interface AdminLoginResponse {
  message: string;
  token: string;
  admin: User;
  success?: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AdminLoginResponse>(
      "/auth/admin/login",
      credentials,
    );
    const data = response.data;
    return {
      success: data.success ?? true,
      message: data.message,
      token: data.token,
      user: data.admin,
    };
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};
