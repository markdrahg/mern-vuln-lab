export type ShipmentStatus =
  | "pending"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "cancelled";

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShipmentDetails extends Shipment {
  timeline: ShipmentTimeline[];
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  carrier: string;
}

export interface ShipmentTimeline {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: Date;
  description: string;
}
