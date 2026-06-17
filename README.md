# Expense Tracker

A simple full-stack expense tracking application built with Spring Boot, React, and MySQL.

## Features

- User authentication and authorization
- Add, edit, delete transactions
- Dashboard with expense summary and pie chart
- User profile management
- Role-based access control
- Responsive UI

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.3.5
- Spring Security
- Spring Data JPA
- MySQL
- Lombok

### Frontend
- React 19
- React Router
- Axios
- Tailwind CSS
- Chart.js (react-chartjs-2)

## Getting Started

### Prerequisites
- Java 17
- Node.js
- MySQL

### Backend Setup

1. Navigate to backend directory:
```
cd backend/SmartExpenseTracker
```

2. Update `src/main/resources/application.properties` with your MySQL credentials

3. Run the application:
```
./mvnw spring-boot:run
```

Backend runs on http://localhost:8080

### Frontend Setup

1. Navigate to frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Run the application:
```
npm run dev
```

Frontend runs on http://localhost:5173

## Usage

1. Register a new user
2. Log in with your credentials
3. Add, edit, or delete transactions
4. View dashboard summary
5. Manage your profile

## Project Structure

```
Expense Tracker/
├── backend/
│   └── SmartExpenseTracker/
│       └── src/main/java/com/SmartExpenseTracker/
│           ├── Config/
│           ├── Controller/
│           ├── dto/
│           ├── exceptions/
│           ├── model/
│           ├── repository/
│           ├── service/
│           └── serviceImpl/
└── frontend/
    └── src/
        └── components/
```
