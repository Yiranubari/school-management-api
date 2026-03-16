# School Management API

A REST API built with Node.js and Express.js for managing school data. The API allows you to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features

- Add a new school
- Retrieve schools sorted by distance
- Input validation using Joi
- Error handling with custom exceptions
- Structured logging with Winston
- RESTful API design

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (Aiven Cloud)
- **Validation:** Joi
- **Logging:** Winston
- **Distance Calculation:** Haversine Formula

## Project Structure

```
school-management-api/
├── config/
│   └── db.js                    ← MySQL connection
├── controllers/
│   └── school.controller.js     ← Request/response handling
├── exceptions/
│   └── app.exception.js         ← Custom exception classes
├── routes/
│   └── school.routes.js         ← Route definitions
├── services/
│   └── school.service.js        ← Business logic
├── utils/
│   ├── haversine.js             ← Distance calculation
│   └── logger.js                ← Winston logger
├── validators/
│   └── school.validator.js      ← Joi validation schemas
├── app.js                       ← Entry point
├── .env                         ← Environment variables
└── .env.example                 ← Environment variables (placeholder)
```

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL database

### Installation

1. Clone the repository

```bash
git clone https://github.com/Yiranubari/school-management-api.git
cd school-management-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=3000
NODE_ENV=development
```

4. Create the schools table in your MySQL database

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT(10, 6) NOT NULL,
  longitude FLOAT(10, 6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Start the server

```bash
npm run dev
```

## API Endpoints

### Health Check

- **Method:** GET
- **URL:** `/health`
- **Success Response:** `200 OK`

```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2026-03-16T15:30:00.000Z",
  "environment": "development"
}
```

### Add School

- **Method:** POST
- **URL:** `/addSchool`
- **Body:**

```json
{
  "name": "Greenwood High School",
  "address": "123 Main Street, Lagos",
  "latitude": 6.5244,
  "longitude": 3.3792
}
```

- **Success Response:** `201 Created`

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1
  }
}
```

### List Schools

- **Method:** GET
- **URL:** `/listSchools?latitude=9.0765&longitude=7.3986`
- **Success Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "name": "Royal Crown School",
      "address": "78 Abuja Municipal, FCT",
      "latitude": 9.0765,
      "longitude": 7.3986,
      "created_at": "2026-03-16T13:47:23.000Z",
      "distance": 0.0
    },
    {
      "id": 1,
      "name": "Greenwood High School",
      "address": "123 Main Street, Lagos",
      "latitude": 6.5244,
      "longitude": 3.3792,
      "created_at": "2026-03-16T13:44:08.000Z",
      "distance": 525.898
    },
    {
      "id": 2,
      "name": "Sunrise Academy",
      "address": "45 Victoria Island, Lagos",
      "latitude": 6.4281,
      "longitude": 3.4219,
      "created_at": "2026-03-16T13:45:22.000Z",
      "distance": 527.882
    }
  ]
}
```

## Live API

Base URL: `https://school-management-api-53lp.onrender.com`

## Postman Collection

[View Documentation](https://documenter.getpostman.com/view/53241440/2sBXigNZXE)

## Author

GitHub: https://github.com/Yiranubari
