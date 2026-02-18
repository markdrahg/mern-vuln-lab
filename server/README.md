# Acme Logistics Portal - Backend API

Production-grade Node.js/Express backend for Acme Logistics Portal with MongoDB, JWT authentication, and admin management.

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **Middleware:** Helmet, CORS, Morgan

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   └── database.ts  # MongoDB connection
│   ├── controllers/     # Business logic
│   │   ├── authController.ts
│   │   └── adminController.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts      # JWT authentication
│   │   └── errorHandler.ts
│   ├── models/          # Mongoose schemas
│   │   ├── Admin.ts
│   │   ├── Shipment.ts
│   │   └── ActivityLog.ts
│   ├── routes/          # API routes
│   │   ├── authRoutes.ts
│   │   └── adminRoutes.ts
│   ├── app.ts           # Express app setup
│   └── index.ts         # Server entry point
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
└── seed.ts             # Database seeding script
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

The `.env` file is pre-configured with:

- MongoDB Atlas URI
- JWT secret
- Server port (5000)

**For production:** Update `JWT_SECRET` with a strong random value.

### 3. Seed Database (Optional)

Create initial admin user and sample shipments:

```bash
npm run build
npx tsx seed.ts
```

**Default credentials:**

- Email: `admin@acmelogistics.com`
- Password: `Admin@123`

### 4. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

**POST** `/api/auth/admin/signup`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "department": "Operations",
  "role": "admin"
}
```

**POST** `/api/auth/admin/login`

```json
{
  "email": "admin@acmelogistics.com",
  "password": "Admin@123"
}
```

**GET** `/api/auth/me` (Protected)

- Returns current admin details

### Admin Dashboard

**GET** `/api/admin/dashboard/metrics`

- Returns: Total admins, shipments, delivery rate, etc.

### Users Management

**GET** `/api/admin/users?page=1&limit=10&status=active`

- Query params:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (active/inactive)

**GET** `/api/admin/users/:id`

### Shipments Management

**GET** `/api/admin/shipments?page=1&limit=10&status=delivered&startDate=2024-01-01&endDate=2024-12-31`

- Query params:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (pending/in_transit/delivered/failed)
  - `startDate`: Filter from date (ISO 8601)
  - `endDate`: Filter to date (ISO 8601)

**POST** `/api/admin/shipments` (Protected)

```json
{
  "id": "SHIP-001",
  "trackingNumber": "TRK123456",
  "customer": "Acme Corp",
  "origin": "New York, NY",
  "destination": "Los Angeles, CA",
  "carrier": "FedEx",
  "weight": "250 lbs",
  "value": 5000
}
```

**GET** `/api/admin/shipments/:id`

**PUT** `/api/admin/shipments/:id` (Protected)

```json
{
  "status": "delivered",
  "actualDelivery": "2024-01-15T10:30:00Z"
}
```

**DELETE** `/api/admin/shipments/:id` (Protected)

### Reports

**GET** `/api/admin/reports/metrics`

- Returns: Shipments by status, value by status, shipments by carrier

## Testing with Postman

1. **Create Admin User** (via signup endpoint)
2. **Login** to get JWT token
3. **Copy token** and add to Authorization header: `Bearer <token>`
4. **Test protected endpoints**

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Token expires in 24 hours.

## Error Handling

Standard HTTP status codes:

- `400`: Bad request / Validation error
- `401`: Unauthorized
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `500`: Server error

## Database Models

### Admin

- `name`, `email`, `password`, `role`, `department`, `phone`, `avatar`, `status`, `lastLogin`, `timestamps`

### Shipment

- `id`, `trackingNumber`, `customer`, `origin`, `destination`, `status`, `carrier`, `weight`, `value`, `createdBy`, `departureDate`, `estimatedDelivery`, `actualDelivery`, `timestamps`

### ActivityLog

- `actionType`, `adminId`, `adminName`, `targetId`, `targetType`, `description`, `status`, `details`, `ipAddress`, `timestamps`

## Notes

- All passwords are hashed using bcryptjs (10 salt rounds)
- Database uses MongoDB Atlas cloud
- CORS enabled for frontend on `http://localhost:5173` (dev) / configured domain (prod)
- Helmet enabled for security headers
- Morgan logging middleware for request logging
