# API Integration Documentation

## Project: FixItNow Frontend

FixItNow is a modern home services marketplace frontend built with Next.js, TypeScript, Tailwind CSS, and React. The platform connects customers with technicians/service providers for home maintenance and repair services.

**Base URL (env variable):**
```
NEXT_PUBLIC_API_URL=https:https://fixit-now-woad.vercel.app
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
| `/dashboard/technician` | Technician overview & stats | `GET /api/technician/dashboard` |
| `/dashboard/technician/my-profile` | View/create/update technician profile | `GET /api/auth/me`, `POST /api/technician/profile`, `PATCH /api/technician/profile-update` |
| `/dashboard/technician/my-services` | List/create technician's services | `GET /api/technician/my-service`, `POST /api/services`, `GET /api/categories` |
| `/dashboard/technician/my-services/[id]` | Update/ a service | `GET /api/technician/services/:id`, `PATCH /api/update-service/:id, GET /api/categories`,  |
| `/dashboard/technician/availability` | Manage availability slots | `GET /api/technician/availability`, `POST /api/technician/availability`, `PUT/api/technician/availability` |
| `/dashboard/technician/bookings` | Manage incoming bookings | `GET /api/technician/bookings`, `PATCH /api/technician/bookings/:id` |

---
/api/technician/my-service
## 4. Admin Routes

| Page (Route) | Feature | API Consumption |
|---|---|---|
| `/dashboard/admin` | Admin overview & platform statistics | `GET /api/admin/dashboard` |
| `/dashboard/admin/users` | Manage users (search, ban/unban) | `GET /api/admin/users?search=${search}&page=${page}`, `PATCH /api/admin/users/:id` |
| `/dashboard/admin/category-management` | Manage service categories | `GET /api/admin/categories?search=${search}`, `/api/admin/categories`, `PATCH /api/admin/categories/${id}` |
| `/dashboard/admin/my-profile` | View  admin profile | `GET /api/auth/me`, |

---

## Notes

- Booking status values: `REQUESTED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.
- Payment outcome pages read the Stripe session/URL params for immediate UI feedback, but final confirmation should rely on a backend Stripe webhook, not the frontend alone.
- Admin routes (`/api/admin/*`) must be protected so only authenticated admin-role users can call them.
- `/api/technician/services/:id` and `GET /api/services?search=...` are query-parameter variants of their base endpoints, not separate routes.

---



Each `*.service.ts` file should export typed functions (e.g. `getMyBookings()`, `createPayment()`) that wrap `fetch`/`axios` calls to `NEXT_PUBLIC_API_URL`, so components only ever call a service function — never `fetch` directly.
