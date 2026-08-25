# API Integration Documentation

## Project: FixItNow Frontend

This document maps every FixItNow frontend route to the backend API endpoint(s) it consumes, grouped by section (Public, Customer, Technician, Admin).

**Base URL (env variable):**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

---

## 1. Public / Auth Routes

| Page (Route) | Feature | API Consumption |
|---|---|---|
| `/` | Home page with featured services, categories, technicians | `GET /api/services`, `GET /api/categories`, `GET /api/technicians` |
| `/about` | Static about page | No API call |
| `/contact` | Contact form | `POST /api/contact` |
| `/service` | Browse & filter services | `GET /api/services`, `GET /api/categories`, `GET /api/services?search=...` |
| `/service/[id]` | Service details & related technicians | `GET /api/services/:id` |
| `/auth/register` | Role selection & registration form | `POST /api/auth/register` |
| `/auth/login` | Login form | `POST /api/auth/login` 
| Logout action | Clear session/token | remove session singOUt() function call |
| `/payment/success` | Payment success outcome page | `GET /api/payments/confirm` |
| `/payment/cancel` | Payment cancelled outcome page | No API call (UI from URL params) |

---

## 2. Customer Routes

| Page (Route) | Feature | API Consumption |
|---|---|---|
| `/dashboard/customer` | Customer overview & booking history | `GET /api/customer/dashboard` |
| `/dashboard/customer/my-profile` | View/update customer profile | `GET  /api/auth/me` |
| `/dashboard/customer/my-bookings` | List customer's bookings (filterable by status) | `/api/bookings?status=${status} |
| `/dashboard/customer/my-bookings/[id]` | Booking details & review submission | `GET /api/bookings/:id`, `POST /api/reviews` |
| `/dashboard/customer/bookings/[id]/pay` | Payment initiation page | `GET /api/bookings/:id`, `POST /api/payments/create` |
| `/dashboard/customer/my-reviews` | View/create customer reviews | `GET /api/reviews` |
| `/dashboard/customer/payments-history` | Customer payment history | `GET /api/payments` |

---

## 3. Technician Routes

| Page (Route) | Feature | API Consumption |
|---|---|---|
| `/dashboard/technician` | Technician overview & stats | `GET /api/technician/dashboard`, `GET /api/auth/me` |
| `/dashboard/technician/my-profile` | View/create/update technician profile | `GET /api/technician/profile`, `POST /api/technician/profile`, `PATCH /api/technician/profile` |
| `/dashboard/technician/my-services` | List/create technician's services | `GET /api/technician/services`, `POST /api/technician/services`, `GET /api/categories` |
| `/dashboard/technician/my-services/[id]` | Update/delete a service | `GET /api/technician/services/:id`, `PATCH /api/technician/services/:id`, `DELETE /api/technician/services/:id` |
| `/dashboard/technician/availability` | Manage availability slots | `GET /api/technician/availability`, `POST /api/technician/availability`, `PATCH /api/technician/availability/:id`, `DELETE /api/technician/availability/:id` |
| `/dashboard/technician/bookings` | Manage incoming bookings | `GET /api/technician/bookings`, `PATCH /api/bookings/:id/status` |

---

## 4. Admin Routes

| Page (Route) | Feature | API Consumption |
|---|---|---|
| `/dashboard/admin` | Admin overview & platform statistics | `GET /api/admin/dashboard`, `GET /api/admin/users`, `GET /api/admin/bookings`, `GET /api/admin/payments` |
| `/dashboard/admin/users` | Manage users (search, ban/unban) | `GET /api/admin/users`, `PATCH /api/admin/users/:id/status` |
| `/dashboard/admin/category-management` | Manage service categories | `GET /api/categories`, `POST /api/categories`, `PATCH /api/categories/:id`, `DELETE /api/categories/:id` |
| `/dashboard/admin/my-profile` | View/update admin profile | `GET /api/auth/me`, `PATCH /api/users/profile` |

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
