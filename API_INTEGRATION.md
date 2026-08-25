# API Integration Documentation

## Project: FixItNow Frontend

This document maps every FixItNow frontend route to the backend API endpoint(s) it consumes, so integration work can be done route-by-route without hunting through separate sections.

**Base URL (env variable):**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

---

## Route → API Mapping

| Frontend Route / Component | APIs Used (Method + Endpoint) |
|---|---|
| `/auth/login` | `POST /api/auth/login` |
| `/auth/register` | `POST /api/auth/register` |
| Global auth/session handling | `GET /api/auth/me` |
| Logout action | `POST /api/auth/logout` |
| `/` (Home) | `GET /api/categories` · `GET /api/services` · `GET /api/technicians` |
| `/about` | No API call (static page) |
| `/contact` | `POST /api/contact` (if backend supports it) |
| `/service` | `GET /api/services` · `GET /api/categories` · `GET /api/services?search=...` |
| `/service/[id]` | `GET /api/services/:id` · `GET /api/technicians?serviceId=:id` |
| `/dashboard/customer` | `GET /api/auth/me` · `GET /api/bookings/my-bookings` · `GET /api/payments/history` |
| `/dashboard/customer/my-profile` | `GET /api/auth/me` · `PATCH /api/users/profile` |
| `/dashboard/customer/my-bookings` | `GET /api/bookings/my-bookings` (supports `?status=` filter, e.g. `ACCEPTED`) |
| `/dashboard/customer/my-bookings/[id]` | `GET /api/bookings/:id` · `POST /api/reviews` |
| `/dashboard/customer/my-bookings/[id]/pay` | `GET /api/bookings/:id` · `POST /api/payments/create` (redirects to Stripe Checkout URL returned) |
| `/dashboard/customer/my-reviews` | `GET /api/reviews/my-reviews` · `POST /api/reviews` |
| `/dashboard/customer/payments-history` | `GET /api/payments/history` |
| `/dashboard/technician` | `GET /api/technician/dashboard` · `GET /api/auth/me` |
| `/dashboard/technician/my-profile` | `GET /api/technician/profile` · `POST /api/technician/profile` · `PATCH /api/technician/profile` |
| `/dashboard/technician/my-services` | `GET /api/technician/services` · `POST /api/technician/services` · `GET /api/categories` |
| `/dashboard/technician/my-services/[id]` | `GET /api/technician/services/:id` · `PATCH /api/technician/services/:id` · `DELETE /api/technician/services/:id` |
| `/dashboard/technician/availability` | `GET /api/technician/availability` · `POST /api/technician/availability` · `PATCH /api/technician/availability/:id` · `DELETE /api/technician/availability/:id` |
| `/dashboard/technician/bookings` | `GET /api/technician/bookings` · `PATCH /api/bookings/:id/status` |
| `/dashboard/admin` | `GET /api/admin/dashboard` · `GET /api/admin/users` · `GET /api/admin/bookings` · `GET /api/admin/payments` |
| `/dashboard/admin/users` | `GET /api/admin/users` (supports `?search=&page=&limit=`) · `PATCH /api/admin/users/:id/status` |
| `/dashboard/admin/category-management` | `GET /api/categories` · `POST /api/categories` · `PATCH /api/categories/:id` · `DELETE /api/categories/:id` |
| `/dashboard/admin/my-profile` | `GET /api/auth/me` · `PATCH /api/users/profile` |
| `/payment/success` | `GET /api/payments/verify` (final confirmation should rely on backend Stripe webhook, not this page alone) |
| `/payment/cancel` | No API call (static cancelled-state page) |

---

## Notes

- **Booking status values:** `REQUESTED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
- **Technician profile fields:** bio, years of experience, skills, location, average rating
- **Technician dashboard data:** upcoming jobs, total earnings, pending requests, completed jobs, booking statistics
- Payment confirmation should be treated as authoritative only from the backend Stripe webhook — `/payment/success` and `/api/payments/verify` are for UI feedback, not the source of truth.

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
    └── dashboard/
        ├── customer/
        ├── technician/
        └── admin/
```

Each `*.service.ts` file should export typed functions (e.g. `getMyBookings()`, `createPayment()`) that wrap `fetch`/`axios` calls to `NEXT_PUBLIC_API_URL`, so components only ever call a service function — never `fetch` directly.
