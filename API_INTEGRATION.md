# API Integration Documentation

## Project: FixItNow Frontend

This document maps FixItNow frontend routes/components to the backend API endpoints they consume.

**Base URL (env variable):**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

---

## Route → API Mapping

| Next.js Route | Component/Feature | Backend API Consumption |
|---|---|---|
| `/` | Home page with featured services | `GET /api/services` |
| `/services` | Browse & filter services/technicians | `GET /api/services`, `GET /api/technicians`, `GET /api/categories` |
| `/technicians/[id]` | Technician profile & booking CTA | `GET /api/technicians/:id` |
| `/auth/register` | Role selection & registration form | `POST /api/auth/register` |
| `/auth/login` | Login form | `POST /api/auth/login` |
| `/dashboard/customer` | Customer overview & booking history | `GET /api/bookings`, `GET /api/payments` |
| `/dashboard/customer/bookings/[id]/pay` | Payment initiation page | `POST /api/payments/create` |
| `/payment/success` & `/payment/cancel` | Payment outcome pages | Updates UI based on URL params/session |
| `/dashboard/technician` | Technician overview & availability | `GET /api/technician/profile`, `GET /api/technician/availability` |
| `/dashboard/technician/bookings` | Manage incoming bookings | `GET /api/technician/bookings`, `PATCH /api/technician/bookings/:id` |
| `/dashboard/admin` | Admin overview & user management | `GET /api/admin/users`, `GET /api/admin/bookings` |
| `/dashboard/admin/categories` | Manage service categories | `GET /api/admin/categories`, `POST /api/admin/categories` |

---

## Features

| Feature | Description | Key Endpoints |
|---|---|---|
| **Authentication & Roles** | Register (with role selection) and log in as customer, technician, or admin | `/api/auth/register` · `/api/auth/login` |
| **Service Discovery** | View featured services on home, browse/filter services and technicians | `/api/services` · `/api/technicians` · `/api/categories` |
| **Technician Profiles** | View a technician's profile and details before booking | `/api/technicians/:id` |
| **Customer Dashboard** | See booking history and payment records at a glance | `/api/bookings` · `/api/payments` |
| **Payments** | Initiate a payment for a booking, then handle success/cancel outcome | `/api/payments/create` |
| **Technician Dashboard** | View profile and manage availability | `/api/technician/profile` · `/api/technician/availability` |
| **Technician Booking Management** | View incoming bookings and update their status | `/api/technician/bookings` · `PATCH /api/technician/bookings/:id` |
| **Admin Dashboard** | Manage users and view/oversee bookings platform-wide | `/api/admin/users` · `/api/admin/bookings` |
| **Admin Category Management** | View and create service categories | `/api/admin/categories` |

---

## Notes

- Payment outcome pages (`/payment/success`, `/payment/cancel`) don't call an API directly — they read the Stripe session/URL params and update the UI. Final payment confirmation should still be verified server-side via a Stripe webhook, not trusted from the URL alone.
- Booking status updates on the technician side use `PATCH /api/technician/bookings/:id` with a status value (e.g. accepted, in progress, completed, cancelled).
- Admin routes should be protected so only authenticated admin-role users can call `/api/admin/*` endpoints.

---

## Recommended Frontend Structure

Centralize all fetch logic in service files rather than inside components:

```text
src/
├── services/
│   ├── auth/auth.service.ts
│   ├── booking/booking.service.ts
│   ├── service/service.service.ts
│   ├── technician/technician.service.ts
│   ├── payment/payment.service.ts
│   ├── review/review.service.ts
│   └── category/category.service.ts
│
└── app/
    ├── auth/
    ├── services/
    ├── technicians/
    ├── payment/
    └── dashboard/
        ├── customer/
        ├── technician/
        └── admin/
```

Each `*.service.ts` file should export typed functions (e.g. `getMyBookings()`, `createPayment()`) that wrap `fetch`/`axios` calls to `NEXT_PUBLIC_API_URL`, so components only ever call a service function — never `fetch` directly.
