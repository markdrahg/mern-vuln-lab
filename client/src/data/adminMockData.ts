import type { ShipmentStatus } from "../types/shipment";

export interface AdminStat {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  joined: string;
}

export interface AdminShipmentRow {
  id: string;
  trackingNumber: string;
  customer: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
}

export const adminStats: AdminStat[] = [
  {
    id: "total-users",
    label: "Total Users",
    value: "1,235",
    delta: "+5 this week",
    trend: "up",
  },
  {
    id: "total-shipments",
    label: "Total Shipments",
    value: "958",
    delta: "+20 this week",
    trend: "up",
  },
  {
    id: "in-transit",
    label: "In Transit",
    value: "284",
    delta: "+10 this week",
    trend: "up",
  },
];

export const recentUsers: AdminUserRow[] = [
  {
    id: "u-001",
    name: "John Admin",
    email: "admin@acmelogistics.com",
    role: "Admin",
    joined: "2024-01-01",
  },
  {
    id: "u-002",
    name: "Emily User",
    email: "emily.user@example.com",
    role: "User",
    joined: "2024-04-10",
  },
  {
    id: "u-003",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    role: "User",
    joined: "2024-04-15",
  },
  {
    id: "u-004",
    name: "Sarah Jones",
    email: "sarah.jones@example.com",
    role: "User",
    joined: "2024-04-20",
  },
  {
    id: "u-005",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "User",
    joined: "2024-04-22",
  },
];

export const recentShipments: AdminShipmentRow[] = [
  {
    id: "s-001",
    trackingNumber: "ACM-2026-004523",
    customer: "John Doe",
    status: "delivered",
    origin: "Los Angeles, CA",
    destination: "San Francisco, CA",
  },
  {
    id: "s-002",
    trackingNumber: "ACM-2026-004522",
    customer: "Jane Smith",
    status: "in_transit",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
  },
  {
    id: "s-003",
    trackingNumber: "ACM-2026-004521",
    customer: "Bob Williams",
    status: "delayed",
    origin: "Miami, FL",
    destination: "Atlanta, GA",
  },
  {
    id: "s-004",
    trackingNumber: "ACM-2026-004520",
    customer: "Alice Johnson",
    status: "delivered",
    origin: "Seattle, WA",
    destination: "Los Angeles, CA",
  },
  {
    id: "s-005",
    trackingNumber: "ACM-2026-004519",
    customer: "Robert Wilson",
    status: "in_transit",
    origin: "Dallas, TX",
    destination: "Houston, TX",
  },
];
