# Admin Dashboard for User, Role, and Permission Management

## **Project Overview**

This project is an admin dashboard designed for managing users, roles, and permissions. The system provides administrators with a secure and user-friendly interface to efficiently manage user data, assign roles, and define permissions. Built with a modern tech stack, it ensures scalability, performance, and security.

---

## **Features**

### **User Management**
- View and manage a list of users.
- Add new users with secure password storage.
- Edit user details and update their status (Active/Inactive).
- Delete users from the system.
- Assign roles to users.

### **Role Management**
- Create, view, and edit roles.
- Define roles with specific permissions (e.g., Read, Write, Delete).
- Associate users with roles dynamically.

### **Permission Management**
- Assign permissions to roles.
- Dynamically modify permissions.
- View and manage all permissions in an intuitive format.

### **Authentication & Security**
- Secure authentication using JWT.
- Password hashing with bcrypt for secure storage.
- Role-based access control (RBAC) to ensure data privacy.

---

## **Tech Stack**

### **Frontend**
- **React (with TypeScript):** For building a responsive and dynamic user interface.
- **Redux:** For state management across the application.
- **TailwindCSS:** For modern and customizable styling.

### **Backend**
- **FastAPI:** For building a robust and scalable REST API.
- **PostgreSQL:** For storing user, role, and permission data.
- **SQLAlchemy:** For ORM and database interactions.


---


## **Setup Instructions**

### **Prerequisites**
- Node.js (v16 or higher)
- Python (v3.10 or higher)
- PostgreSQL (v13 or higher)

### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/Rana718/RBAC.git
   ```
2. **Backend Setup** 
   ```bash
   cd backend 
   pip install -r requirements.txt
   ```
   Configure environment variables in a `.env` file
   ```bash
   DATABASE_URL='your database url'
   JWT_KEY='your Jwt key'
   ```
   run the Backend server using this commend
   ```bash
   uvicorn main:app --reload --port 5000 
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   bun install
   ```
   Configure environment variables in a `.env` file
   ```bash
   VITE_API_URL='your api url'
   ```
   run the frontend server using this commend
   ```bash
   bun run dev
   ```

4. **Access the application** at `http://localhost:5173`



-----


   
