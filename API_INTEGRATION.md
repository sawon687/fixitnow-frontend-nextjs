# API Integration Documentation

## Project: FixItNow Frontend

This document maps every FixItNow frontend route to the backend API endpoint(s) it consumes.

**Base URL (env variable):**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

---

## Route → API Mapping

| Next.js Route | Component/Feature | Backend API Consumption |
|---|---|---|
| `/` | Home page with featured services, categories, technicians | `GET /api/services`, `GET /api/categories`, `GET /api/technicians` |
| `/about` | Static about page | No API call |
| `/contact` | Contact form | `POST /api/contact` |
| `/service` | Browse & filter services | `GET /api/services`, `GET /api/categories`, `GET /api/services?search=...` |
| `/service/[id]` | Service details & related technicians | `GET /api/services/:id`, `GET /api/technicians?serviceId=:id` |
| `/services` | Browse & filter services/technicians | `GET /api/services`, `GET /api/technicians`, `GET /api/categories` |
| `/technicians/[id]` | Technician profile & booking CTA | `GET /api/technicians/:id` |
| `/auth/register` | Role selection & registration form | `POST /api/auth/register` |
| `/auth/login` | Login form | `POST /api/auth/login` |
| Global auth/session handling | Get current authenticated user | `GET /api/auth/me` |
| Logout action | Clear session/token | `POST /api/auth/logout` |
| `/dashboard/customer` | Customer overview & booking history | `GET /api/auth/me`, `GET /api/bookings/my-bookings`, `GET /api/payments/history` |
| `/dashboard/customer/my-profile` | View/update customer profile | `GET /api/auth/me`, `PATCH /api/users/profile` |
| `/dashboard/customer/my-bookings` | List customer's bookings (filterable by status) | `GET /api/bookings/my-bookings` |
| `/dashboard/customer/my-bookings/[id]` | Booking details & review submission | `GET /api/bookings/:id`, `POST /api/reviews` |
| `/dashboard/customer/bookings/[id]/pay` | Payment initiation page | `GET /api/bookings/:id`, `POST /api/payments/create` |
| `/dashboard/customer/my-reviews` | View/create customer reviews | `GET /api/reviews/my-reviews`, `POST /api/reviews` |
| `/dashboard/customer/payments-history` | Customer payment history | `GET /api/payments/history` |
| `/payment/success` & `/payment/cancel` | Payment outcome pages | `GET /api/payments/verify` (success page); cancel page updates UI from URL params only |
| `/dashboard/technician` | Technician overview & stats | `GET /api/technician/dashboard`, `GET /api/auth/me` |
| `/dashboard/technician/my-profile` | View/create/update technician profile | `GET /api/technician/profile`, `POST /api/technician/profile`, `PATCH /api/technician/profile` |
| `/dashboard/technician/my-services` | List/create technician's services | `GET /api/technician/services`, `POST /api/technician/services`, `GET /api/categories` |
| `/dashboard/technician/my-services/[id]` | Update/delete a service | `GET /api/technician/services/:id`, `PATCH /api/technician/services/:id`, `DELETE /api/technician/services/:id` |
| `/dashboard/technician/availability` | Manage availability slots | `GET /api/technician/availability`, `POST /api/technician/availability`, `PATCH /api/technician/availability/:id`, `DELETE /api/technician/availability/:id` |
| `/dashboard/technician/bookings` | Manage incoming bookings | `GET /api/technician/bookings`, `PATCH /api/bookings/:id/status` |
| `/dashboard/admin` | Admin overview & platform statistics | `GET /api/admin/dashboard`, `GET /api/admin/users`, `GET /api/admin/bookings`, `GET /api/admin/payments` |
| `/dashboard/admin/users` | Manage users (search, ban/unban) | `GET /api/admin/users`, `PATCH /api/admin/users/:id/status` |
| `/dashboard/admin/category-management` | Manage service categories | `GET /api/categories`, `POST /api/categories`, `PATCH /api/categories/:id`, `DELETE /api/categories/:id` |
| `/dashboard/admin/my-profile` | View/update admin profile | `GET /api/auth/me`, `PATCH /api/users/profile` |

---

## Features

| Feature | Description | Key Endpoints |
|---|---|---|
| **Authentication & Roles** | Register (with role selection), log in, session handling, logout for customer, technician, and admin | `/api/auth/register` · `/api/auth/login` · `/api/auth/me` · `/api/auth/logout` |
| **Service Discovery** | View featured services, browse/filter services and categories, view service details | `/api/services` · `/api/categories` · `/api/services/:id` |
| **Technician Listings & Profiles** | Browse technicians, view a technician's profile before booking | `/api/technicians` · `/api/technicians/:id` |
| **Booking Management (Customer)** | Create/view bookings, filter by status, view booking details | `/api/bookings/my-bookings` · `/api/bookings/:id` |
| **Booking Management (Technician)** | View assigned bookings, accept/decline/mark in-progress/complete | `/api/technician/bookings` · `/api/bookings/:id/status` |
| **Payments** | Initiate Stripe checkout, verify payment, view payment history | `/api/payments/create` · `/api/payments/verify` · `/api/payments/history` |
| **Reviews & Ratings** | Submit a review after a completed booking, view own reviews | `/api/reviews` · `/api/reviews/my-reviews` |
| **Technician Profile Management** | Create/update technician profile (bio, experience, skills, location, rating) | `/api/technician/profile` |
| **Technician Service Management** | Create, update, delete services offered by a technician | `/api/technician/services` · `/api/technician/services/:id` |
| **Technician Availability** | Set, update, and remove available time slots | `/api/technician/availability` · `/api/technician/availability/:id` |
| **Technician Dashboard & Stats** | Upcoming jobs, earnings, pending requests, completed jobs at a glance | `/api/technician/dashboard` |
| **Admin User Management** | Search/paginate users, ban/unban accounts | `/api/admin/users` · `/api/admin/users/:id/status` |
| **Admin Category Management** | Create, update, delete service categories | `/api/categories` |
| **Admin Platform Stats** | Platform-wide booking, user, and revenue statistics | `/api/admin/dashboard` · `/api/admin/bookings` · `/api/admin/payments` |
| **Profile Management (all roles)** | View and update own profile | `/api/auth/me` · `/api/users/profile` |
| **Contact Form** | Submit a message from the public contact page | `/api/contact` |

---

## Notes

- Booking status values: `REQUESTED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.
- Payment outcome pages read the Stripe session/URL params for immediate UI feedback, but final confirmation should rely on a backend Stripe webhook, not the frontend alone.
- Admin routes (`/api/admin/*`) must be protected so only authenticated admin-role users can call them.
- `GET /api/technicians?serviceId=:id` and `GET /api/services?search=...` are query-parameter variants of their base endpoints, not separate routes.

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
    ├── service/
    ├── technicians/
    ├── payment/
    └── dashboard/
        ├── customer/
        ├── technician/
        └── admin/
```

Each `*.service.ts` file should export typed functions (e.g. `getMyBookings()`, `createPayment()`) that wrap `fetch`/`axios` calls to `NEXT_PUBLIC_API_URL`, so components only ever call a service function — never `fetch` directly.
