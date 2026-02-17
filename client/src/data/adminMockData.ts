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

export interface AdminUserManagementRow extends AdminUserRow {
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

export interface AdminShipmentRow {
  id: string;
  trackingNumber: string;
  customer: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
}

export interface AdminReportMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

export interface AdminReportRouteRow {
  id: string;
  route: string;
  volume: number;
  onTimeRate: string;
  avgTransit: string;
}

export interface AdminReportSeriesPoint {
  label: string;
  value: number;
}

export interface AdminReportActivityRow {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "Success" | "Warning" | "Info";
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

export const adminUsers: AdminUserManagementRow[] = [
  {
    id: "u-101",
    name: "John Admin",
    email: "admin@acmelogistics.com",
    role: "Admin",
    joined: "2024-01-01",
    status: "Active",
    lastActive: "2026-02-16",
  },
  {
    id: "u-102",
    name: "Emily User",
    email: "emily.user@example.com",
    role: "User",
    joined: "2024-04-10",
    status: "Active",
    lastActive: "2026-02-15",
  },
  {
    id: "u-103",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    role: "User",
    joined: "2024-04-15",
    status: "Active",
    lastActive: "2026-02-12",
  },
  {
    id: "u-104",
    name: "Sarah Jones",
    email: "sarah.jones@example.com",
    role: "User",
    joined: "2024-04-20",
    status: "Invited",
    lastActive: "2026-02-08",
  },
  {
    id: "u-105",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "User",
    joined: "2024-04-22",
    status: "Suspended",
    lastActive: "2026-01-29",
  },
  {
    id: "u-106",
    name: "Ava Patel",
    email: "ava.patel@example.com",
    role: "User",
    joined: "2024-05-02",
    status: "Active",
    lastActive: "2026-02-16",
  },
  {
    id: "u-107",
    name: "Noah Carter",
    email: "noah.carter@example.com",
    role: "User",
    joined: "2024-05-11",
    status: "Invited",
    lastActive: "2026-02-10",
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

export const adminShipments: AdminShipmentRow[] = [
  {
    id: "s-101",
    trackingNumber: "ACM-2026-004610",
    customer: "Jordan Lee",
    status: "in_transit",
    origin: "New York, NY",
    destination: "Boston, MA",
  },
  {
    id: "s-102",
    trackingNumber: "ACM-2026-004609",
    customer: "Priya Singh",
    status: "delivered",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
  },
  {
    id: "s-103",
    trackingNumber: "ACM-2026-004608",
    customer: "Carlos Mendez",
    status: "delayed",
    origin: "Houston, TX",
    destination: "Miami, FL",
  },
  {
    id: "s-104",
    trackingNumber: "ACM-2026-004607",
    customer: "Ava Patel",
    status: "out_for_delivery",
    origin: "Seattle, WA",
    destination: "Portland, OR",
  },
  {
    id: "s-105",
    trackingNumber: "ACM-2026-004606",
    customer: "Noah Carter",
    status: "pending",
    origin: "Chicago, IL",
    destination: "St. Louis, MO",
  },
  {
    id: "s-106",
    trackingNumber: "ACM-2026-004605",
    customer: "Emily Chen",
    status: "in_transit",
    origin: "Denver, CO",
    destination: "Salt Lake City, UT",
  },
  {
    id: "s-107",
    trackingNumber: "ACM-2026-004604",
    customer: "Marcus Hill",
    status: "delivered",
    origin: "Dallas, TX",
    destination: "Austin, TX",
  },
  {
    id: "s-108",
    trackingNumber: "ACM-2026-004603",
    customer: "Sara Gomez",
    status: "cancelled",
    origin: "San Diego, CA",
    destination: "Las Vegas, NV",
  },
];

export const reportMetrics: AdminReportMetric[] = [
  {
    id: "on-time",
    label: "On-Time Delivery",
    value: "94.2%",
    delta: "+1.8% vs last month",
    trend: "up",
  },
  {
    id: "avg-transit",
    label: "Avg Transit Time",
    value: "2.6 days",
    delta: "-0.3 days",
    trend: "down",
  },
  {
    id: "exceptions",
    label: "Exception Rate",
    value: "3.4%",
    delta: "-0.6% vs last month",
    trend: "down",
  },
  {
    id: "utilization",
    label: "Fleet Utilization",
    value: "81%",
    delta: "+4% vs last month",
    trend: "up",
  },
];

export const reportRoutes: AdminReportRouteRow[] = [
  {
    id: "r-01",
    route: "Los Angeles, CA -> Phoenix, AZ",
    volume: 184,
    onTimeRate: "96%",
    avgTransit: "1.8 days",
  },
  {
    id: "r-02",
    route: "Dallas, TX -> Houston, TX",
    volume: 162,
    onTimeRate: "92%",
    avgTransit: "1.2 days",
  },
  {
    id: "r-03",
    route: "Chicago, IL -> St. Louis, MO",
    volume: 141,
    onTimeRate: "90%",
    avgTransit: "1.6 days",
  },
  {
    id: "r-04",
    route: "Seattle, WA -> Portland, OR",
    volume: 128,
    onTimeRate: "97%",
    avgTransit: "1.1 days",
  },
  {
    id: "r-05",
    route: "New York, NY -> Boston, MA",
    volume: 117,
    onTimeRate: "93%",
    avgTransit: "1.7 days",
  },
];

export const reportWeeklyVolume: AdminReportSeriesPoint[] = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 148 },
  { label: "Wed", value: 132 },
  { label: "Thu", value: 168 },
  { label: "Fri", value: 190 },
  { label: "Sat", value: 110 },
  { label: "Sun", value: 96 },
];

export const reportOnTimeTrend: AdminReportSeriesPoint[] = [
  { label: "Wk 1", value: 91 },
  { label: "Wk 2", value: 92 },
  { label: "Wk 3", value: 93 },
  { label: "Wk 4", value: 94 },
  { label: "Wk 5", value: 95 },
];

export const reportActivity: AdminReportActivityRow[] = [
  {
    id: "a-01",
    title: "Carrier delay alert",
    description: "Midwest corridor experiencing 4-6 hour delays.",
    time: "Today, 09:12",
    status: "Warning",
  },
  {
    id: "a-02",
    title: "Weekly KPI export",
    description: "Performance report delivered to finance team.",
    time: "Yesterday, 16:40",
    status: "Success",
  },
  {
    id: "a-03",
    title: "On-time milestone",
    description: "On-time delivery exceeded 94% for Q1.",
    time: "Yesterday, 11:05",
    status: "Success",
  },
  {
    id: "a-04",
    title: "Route optimization run",
    description: "Suggested 12 lane adjustments for next week.",
    time: "Feb 15, 14:22",
    status: "Info",
  },
];
