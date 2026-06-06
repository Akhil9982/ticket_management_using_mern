# 🎫 MERN-Stack Ticket Management Dashboard

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A robust, role-based support ticket management system built with the MERN stack. This application streamlines customer support by allowing users to submit issues, while empowering support agents and administrators with a centralized dashboard to track, update, and resolve tickets efficiently.

> **🚧 Development Status: Phase 1 (Backend) Complete**
> The RESTful API, database schema, and security layers are fully implemented and tested. Frontend development (React/Vite) is currently in progress.

---

## 📑 Table of Contents
1. [Project Roadmap](#project-roadmap)
2. [Core Features](#core-features)
3. [Tech Stack & Tools](#tech-stack--tools)
4. [Development Workflow & AI Integration](#development-workflow--ai-integration)
5. [System Architecture & Database Design](#system-architecture--database-design)
6. [Backend Directory Structure](#backend-directory-structure)
7. [API Documentation](#api-documentation)
8. [Local Development Setup](#local-development-setup)

---

## 📍 Project Roadmap

| Phase | Milestone               | Description                                                                      | Status |
| :---- | :---------------------- | :------------------------------------------------------------------------------- | :----: |
| **1** | **Backend Scaffold**    | Express server setup, MongoDB Atlas integration, environment variables           |   ✅   |
| **2** | **Security Layer**      | JWT authentication, bcrypt password hashing, custom RBAC middleware              |   ✅   |
| **3** | **Core API Logic**      | RESTful routing and MVC controllers for Users, Tickets, and Comments             |   ✅   |
| **4** | **Frontend Scaffold**   | Initialize Vite/React, set up React Router, configure Tailwind/UI library         |   ⏳   |
| **5** | **State & Integration** | Connect React to API via Axios, manage global state, handle JWT in local storage |   ⏳   |
| **6** | **Deployment**          | Deploy backend to Render/Railway and frontend to Vercel/Netlify                  |   ⏳   |

---

## ✨ Core Features

The system uses strict Role-Based Access Control (RBAC) to ensure data privacy and workflow integrity.

**Customer (`customer`)**

- Register and log in securely.
- Create new support tickets with titles, descriptions, and priority levels.
- View a personalized dashboard of only their own tickets.
- Communicate with support staff via ticket-specific comment threads.

**Support Agent (`agent`)**

- View a global queue of all active support tickets.
- Assign unassigned tickets to themselves.
- Update ticket statuses (Open, In Progress, Resolved, Closed).
- Add public replies or internal private notes to ticket comment threads.

**Administrator (`admin`)**

- Inherits all Agent capabilities.
- Global destructive privileges (e.g., permanently deleting tickets).
- Oversee system-wide metrics and user roles.

---

## 🛠️ Tech Stack & Tools

**Frontend Architecture**

- **React.js:** Core JavaScript library for building the interactive User Interface.
- **Vite:** Next-generation frontend tooling used for ultra-fast scaffolding, local development, and optimized production builds.
- **React Router DOM:** _(Planned)_ For handling client-side routing and protecting private dashboard routes.
- **Axios:** _(Planned)_ Promise-based HTTP client for making API requests from the frontend to the Express server.

**Backend Architecture**

- **Node.js:** JavaScript runtime environment executing the server-side logic.
- **Express.js:** Web application framework used to build the RESTful API and handle middleware routing.
- **MongoDB Atlas:** Fully managed cloud NoSQL database used to store Users, Tickets, and Comments.
- **Mongoose:** Object Data Modeling (ODM) library used to enforce strict database schemas and handle complex relational queries (like `.populate()`).

**Security & Authentication**

- **JSON Web Tokens (JWT):** Used for stateless, secure user authentication and authorization across the application.
- **Bcrypt.js:** Cryptographic library used to securely hash and salt user passwords before saving them to the database.
- **Dotenv:** Zero-dependency module that loads environment variables (like secret keys and database URIs) securely.

**Development & Testing Tools**

- **Postman:** Used extensively for testing backend API endpoints, simulating client requests, and verifying RBAC (Role-Based Access Control) logic.
- **Nodemon:** Development utility that automatically restarts the Node server whenever file changes are detected.
- **Git & GitHub:** Version control and repository hosting.
- **VS Code:** Primary Integrated Development Environment (IDE).

**
**Deployment (Planned)**

- **Frontend Hosting:** Vercel / Netlify
- **Backend Hosting:** Render / Railway

---

## 🚀 Development Workflow & AI Integration

To maximize efficiency and maintain high code quality, this project was developed using a modern, AI-assisted workflow. 

Large Language Models (**ChatGPT** and **Google Gemini**) were leveraged throughout the development lifecycle to:
* Rapidly debug complex Node.js errors and MongoDB schema conflicts.
* Brainstorm architectural approaches and security best practices (like RBAC).
* Improve overall developer velocity and workflow optimization. 

*Note: While AI was used as an advanced pair-programming tool, all system architecture, structural decisions, and final code implementation were critically evaluated and manually integrated.*

---

## 🏗️ System Architecture & Database Design

This backend strictly adheres to the **Model-View-Controller (MVC)** architectural pattern.

**Database Strategy (MongoDB):**
To ensure high scalability, the database utilizes **Referencing (ObjectIds)** rather than embedding.

- The `Ticket` schema references the `User` schema for both the `createdBy` and `assignedTo` fields.
- The `Comment` schema exists as a separate collection, referencing both the `TicketId` and the `senderId`. This prevents a ticket with hundreds of replies from hitting MongoDB's 16MB document size limit.

**Security Flow:**

1. Passwords are never stored in plain text; they are hashed using `bcryptjs` upon registration.
2. Successful login returns a stateless `JSON Web Token (JWT)`.
3. Protected routes utilize a two-step custom middleware chain:
   - `protect`: Verifies the JWT signature and attaches the user object to the request.
   - `allowedRoles`: Verifies the user's role matches the required permission level before executing the controller logic.

---

## 🔄 Project Flow & Lifecycle

1. **Onboarding:** Users register as a `customer` (default), `agent`, or `admin`.
2. **Authentication:** Upon login, the server issues a JWT, which the client stores and attaches to the headers of all subsequent requests.
3. **Ticket Creation:** A customer submits a new ticket. The server automatically binds the customer's `ObjectId` to the ticket document to establish ownership.
4. **Queue Management:** Support agents view a global queue of tickets, assign issues to themselves, and update statuses (e.g., _Open_ → _In Progress_).
5. **Communication:** Customers and agents communicate via a nested Comment schema tied to the specific ticket.
6. **Resolution:** Agents or Admins mark the ticket as _Resolved_ or _Closed_. Admins retain global destructive privileges (e.g., deleting tickets).

---

## 📂 Backend Directory Structure

```text
backend/
├── config/
│   └── db.js                 # MongoDB connection logic
├── controllers/
│   ├── comment.controller.js # Logic for adding/fetching comments
│   ├── ticket.controller.js  # CRUD logic for support tickets
│   └── user.controller.js    # Auth logic (Register/Login)
├── middlewares/
│   └── auth.middleware.js    # JWT verification and RBAC enforcement
├── models/
│   ├── Comment.js            # Mongoose schema for comments
│   ├── Ticket.js             # Mongoose schema for tickets
│   └── User.js               # Mongoose schema for users
├── routes/
│   ├── comment.routes.js     # Merged parameter routes for comments
│   ├── ticket.routes.js      # Ticket endpoint mappings
│   └── user.routes.js        # Auth endpoint mappings
├── .env                      # Environment variables (Ignored in Git)
├── package.json              # Backend dependencies
└── server.js                 # Main Express application entry point
```

**🔌 API Documentation**  
Base API URL: http://localhost:5000/api  
**Authentication Routes**

| Method | Endpoint        | Required JSON Payload       | Access |
| ------ | --------------- | --------------------------- | ------ |
| POST   | /users/register | name, email, password, role | Public |
| POST   | /users/login    | email, password             | Public |

**Ticket Routes**  
_Requires Authorization: Bearer \<token\> in headers._

| Method | Endpoint                  | Description                                      | Access   |
| ------ | ------------------------- | ------------------------------------------------ | -------- |
| GET    | /tickets/getTickets       | Fetch tickets (Customers see own; Staff see all) | All      |
| POST   | /tickets/createTicket     | Create a ticket (title, description, priority)   | customer |
| GET    | /tickets/:id              | Fetch details of a specific ticket               | All      |
| PUT    | /tickets/:id              | Update ticket details (e.g., status)             | All      |
| DELETE | /tickets/deleteTicket/:id | Delete a ticket entirely                         | admin    |

**Comment Routes**  
_Requires Authorization: Bearer \<token\> in headers._

| Method | Endpoint                    | Description                     | Access |
| ------ | --------------------------- | ------------------------------- | ------ |
| GET    | /tickets/:ticketId/comments | Fetch all comments for a ticket | All    |
| POST   | /tickets/:ticketId/comments | Add a comment (message)         | All    |

## Backend API

Our API is fully documented. Please see the [API Documentation](backend/api-documentation.md) for endpoints, payloads, tested edge cases and authorization requirements.

**💻 Local Development Setup**

To run the backend locally, follow these steps:

1\. Clone the repository

```bash
git clone [https://github.com/yourusername/ticket-management-dashboard.git\](https://github.com/yourusername/ticket-management-dashboard.git)
cd ticket-management-dashboard/backend
```

2\. Install dependencies

```bash
npm install
```

3\. Configure Environment Variables

Create a .env file in the root of the backend directory. You will need a free MongoDB Atlas account to get your URI.

```env
PORT=5000
MONGO\_URI=mongodb+srv://\<username\>:\<password\>@cluster0.mongodb.net/ticket\_db
JWT\_SECRET=add\_your\_random\_secret\_string\_here
```

4\. Start the server

```bash
\# Run with nodemon for active development
npm run dev

\# OR run standard Node process
npm start
```

If configured correctly, your console will output:

```bash
Database successfully connected
Server running on http://localhost:3000
```

**🤝 Contributing**

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

## 👤 Author

**Akhil Battula** [![GitHub](https://img.shields.io/badge/GitHub-Akhil9982-181717?style=flat&logo=github)](https://github.com/Akhil9982)

---

Made with ❤️ and the MERN Stack._
