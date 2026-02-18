import apiClient from "../api/client";

export interface Shipment {
  _id?: string;
  id: string;
  trackingNumber: string;
  customer: string;
  origin: string;
  destination: string;
  status: "pending" | "in_transit" | "delivered" | "delayed" | "cancelled";
  carrier: string;
  weight: string;
  value: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShipmentsResponse {
  success: boolean;
  data: Shipment[];
  total: number;
  page: number;
  limit: number;
}

export const shipmentService = {
  async getShipments(
    page = 1,
    limit = 10,
    status?: string,
  ): Promise<ShipmentsResponse> {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (status) params.append("status", status);

    const response = await apiClient.get(`/admin/shipments?${params}`);
    return response.data;
  },

  async getShipmentById(id: string): Promise<Shipment> {
    const response = await apiClient.get(`/admin/shipments/${id}`);
    return response.data.data;
  },

  async updateShipment(id: string, data: Partial<Shipment>): Promise<Shipment> {
    const response = await apiClient.put(`/admin/shipments/${id}`, data);
    return response.data.data;
  },

  async deleteShipment(id: string): Promise<void> {
    await apiClient.delete(`/admin/shipments/${id}`);
  },

  async createShipment(data: Omit<Shipment, "_id">): Promise<Shipment> {
    const response = await apiClient.post("/admin/shipments", data);
    return response.data.data;
  },
};
