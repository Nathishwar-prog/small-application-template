# REST API Endpoint Reference

This guide details authentication methods, payload formats, and access controls for active routes.

## 1. Authentication Scheme

All protected endpoints require an `Authorization` Bearer token header:

```http
Authorization: Bearer <your-jwt-access-token>
```

---

## 2. Authentication Endpoints

### 2.1 User Registration
- **Route**: `POST /api/v1/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "jane.doe@enterprise.com",
    "password": "SecurePassword123!",
    "firstName": "Jane",
    "lastName": "Doe"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "id": "user-uuid",
      "email": "jane.doe@enterprise.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true,
      "permissions": ["users:read"],
      "createdAt": "2026-06-25T12:00:00.000Z",
      "updatedAt": "2026-06-25T12:00:00.000Z"
    }
  }
  ```

### 2.2 User Sign-in
- **Route**: `POST /api/v1/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "jane.doe@enterprise.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK)**:
  - Sets **HttpOnly Cookie** `refreshToken` (scoped to `/api/v1/auth/refresh`).
  - Response payload:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "accessToken": "ey...",
        "user": { ... }
      }
    }
    ```

### 2.3 Token Renewal
- **Route**: `POST /api/v1/auth/refresh`
- **Access**: Public (requires HttpOnly Cookie `refreshToken`)
- **Response (200 OK)**:
  - Dispatches new **HttpOnly Cookie** `refreshToken`.
  - Response payload:
    ```json
    {
      "success": true,
      "message": "Token refreshed successfully",
      "data": {
        "accessToken": "ey..."
      }
    }
    ```

### 2.4 Sign-out
- **Route**: `POST /api/v1/auth/logout`
- **Access**: Public
- **Response (200 OK)**:
  - Clears `refreshToken` HttpOnly cookie.

---

## 3. User Endpoints

### 3.1 Fetch Current User Profile
- **Route**: `GET /api/v1/users/me`
- **Access**: Authenticated (JWT)

### 3.2 Update Current User Profile
- **Route**: `PATCH /api/v1/users/me`
- **Access**: Authenticated (JWT)

### 3.3 List Directory Accounts
- **Route**: `GET /api/v1/users`
- **Access**: Admin Roles (`ADMIN` or `SUPER_ADMIN`)
- **Query Params**: `skip` (default 0), `take` (default 20)

### 3.4 Terminate Account
- **Route**: `DELETE /api/v1/users/:id`
- **Access**: `SUPER_ADMIN` role + `users:delete` permission
