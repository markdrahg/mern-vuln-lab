import apiClient from "../api/client";

export interface AdminUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: "admin" | "super_admin" | "operator";
  department: string;
  phone: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminsResponse {
  success: boolean;
  data: AdminUser[];
  total: number;
  page: number;
  limit: number;
}

export interface ActivityLog {
  _id?: string;
  id?: string;
  action: string;
  user?: string;
  timestamp?: string;
  details?: string;
}

export interface DashboardMetrics {
  totalAdmins: number;
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  recentActivities: ActivityLog[];
}

export const adminService = {
  async getAdmins(page = 1, limit = 10): Promise<AdminsResponse> {
    const response = await apiClient.get(
      `/admin/users?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  async getAdminById(id: string): Promise<AdminUser> {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data.data;
  },

  async createAdmin(data: Omit<AdminUser, "_id" | "id">): Promise<AdminUser> {
    const response = await apiClient.post("/admin/users", data);
    return response.data.data;
  },

  async updateAdmin(id: string, data: Partial<AdminUser>): Promise<AdminUser> {
    const response = await apiClient.put(`/admin/users/${id}`, data);
    return response.data.data;
  },

  async deleteAdmin(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  },

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get("/admin/dashboard/metrics");
    return response.data.data;
  },

  async getActivityLogs(page = 1, limit = 20) {
    const response = await apiClient.get(
      `/admin/activity-logs?page=${page}&limit=${limit}`,
    );
    return response.data;
  },
};
