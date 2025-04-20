# Microproject: Hospital & Ventilator Management API

![License](https://img.shields.io/badge/license-ISC-blue.svg)

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running The Servers](#running-the-servers)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Hospital Routes](#hospital-routes)
  - [Ventilator Routes](#ventilator-routes)
- [Configuration](#configuration)
- [Contact](#contact)
- [License](#license)

## About The Project

This is a lightweight Node.js microservice for managing hospital and ventilator records. It uses Express for routing, MongoDB for data storage, and JWT for securing endpoints.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JSON Web Tokens](https://jwt.io/)

## Getting Started

### Prerequisites

- Node.js (v12+)
- MongoDB running locally (default port)

### Installation

```bash
# Clone repository
git clone https://github.com/<your‑username>/microproject.git
cd microproject

# Install dependencies
npm install
```

### Running The Servers

1. Ensure MongoDB is running locally.
2. Start the service (this spins up both auth (port 8000) and API (port 3000)):
   ```bash
   npm start
   ```

## API Endpoints

> **Note**: All endpoints under `/hospitals` and `/ventilators` require a valid JWT in the `Authorization` header: `Bearer <token>`.

### Authentication

**POST** `http://localhost:8000/login`

- Body (JSON):
  ```json
  {
    "username": "arvind",
    "password": "arvind"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Authentication successful!",
    "token": "<JWT>"
  }
  ```

### Hospital Routes (port 3000)

**GET** `/hospitals`

- Body params (JSON, optional):
  - `name` — filter hospitals by name (case-insensitive substring)
- Returns: Array of hospital documents.

### Ventilator Routes (port 3000)

- **GET** `/ventilators`  
  Optional body params:
  - `status` — filter by ventilator status
  - `hname` — filter by hospital name

- **PATCH** `/ventilators`  
  Body params:
  - `ventilatorId` — ID of the ventilator to update
  - `status` — new status value

- **DELETE** `/ventilators?ventilatorId=<id>`

- **POST** `/ventilators?hid=<hospitalId>&ventilatorId=<id>&status=<status>&hname=<hospitalName>`

## Configuration

- Edit `config.js` to change the JWT secret.
- MongoDB URL is set in `index.js` (`mongodb://127.0.0.1/27017`) and uses database `hospitalManagement`.

## Contact

Created by Arvind Reddy.

