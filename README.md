# Leaflet Map End to End Ride Share Application

![Screenshot 2025-01-31 at 6 03 40 PM](https://github.com/user-attachments/assets/5ce7d782-e004-4a66-8505-aefd468c8de6)

## 📌 Overview
This is a **full-stack rideshare application** built with **React (frontend) and Django (backend)**. The app provides **JWT-based authentication**, **RBAC (Role-Based Access Control)**, **fare calculation**, **multi-stop functionality**, and a **custom A* routing algorithm**. It allows **riders and drivers to match and accept rides**.

The backend is powered by **Django** with **PostgreSQL**, running on **Gunicorn** and served using **Nginx**. The entire application is **containerized using Docker Compose**.

---

## 🛠️ Tech Stack
- **Frontend:** React (JavaScript)
- **Backend:** Django (Python)
- **Authentication:** JWT (JSON Web Token)
- **Database:** PostgreSQL
- **Server:** Nginx + Gunicorn
- **Routing Algorithm:** Custom **A* Algorithm**
- **RBAC (Role-Based Access Control)** for **admin, driver, and rider**
- **Containerization:** Docker & Docker Compose

---

## 📦 Features
### ✅ User Authentication & RBAC
- JWT-based authentication
- Role-Based Access Control (RBAC): Rider, Driver, and Admin
- Token-based login/logout functionality

### ✅ Ride Functionality
- Riders can request a ride and select **multiple stops**.
- Drivers can accept rides based on availability.
- Fare calculation based on **distance, stops, and base price**.
- Uses a **custom A* routing algorithm** for optimized routes.

### ✅ Database & Backend
- PostgreSQL database for storing users, rides, and transactions.
- Django REST Framework (DRF) for API handling.
- Django ORM for secure database queries.
- **Admin panel for managing users & rides.**

### ✅ Deployment & Performance
- **Nginx** reverse proxy for handling static files & requests.
- **Gunicorn** WSGI server for efficient Django processing.
- **Docker Compose** for easy deployment.

---

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/rideshare-app.git
cd rideshare-app
```

### **2️⃣ Setup Environment Variables**
Create a `.env` file inside the `backend/` directory:
```sh
DJANGO_SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgres://postgres:1972@db:5432/RideShare
```

---

## 🐳 Running the App with Docker
### **3️⃣ Start Docker Containers**
```sh
docker compose up --build -d
```
This will:
- Start **PostgreSQL** database
- Start **Django backend** with **Gunicorn**
- Start **React frontend**
- Start **Nginx** as a reverse proxy

### **4️⃣ Check Running Containers**
```sh
docker ps
```
You should see:
- `gmaps-companion-web-1` (Django backend)
- `gmaps-companion-frontend-1` (React frontend)
- `gmaps-companion-db-1` (PostgreSQL database)
- `gmaps-companion-nginx-1` (Nginx server)

### **5️⃣ Running Migrations**
```sh
docker exec -it gmaps-companion-web-1 python manage.py migrate
```

### **6️⃣ Access the Application**
- **Frontend (React App):** [`http://localhost:8080`](http://localhost:8080)
- **Backend API (Django):** [`http://localhost:8000/api/`](http://localhost:8000/api/)
- **Admin Panel:** [`http://localhost:8000/admin/`](http://localhost:8000/admin/) (Login required)

---

## 🛠️ Local Development (Without Docker)
If you prefer running without Docker:

### **Frontend (React)**
```sh
cd frontend
npm install
npm start
```

### **Backend (Django)**
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🏗️ Project Structure
```
project-root/
├── backend/            # Django backend
│   ├── mapback/        # Django project files
│   ├── rides/          # Main Django app
│   ├── manage.py       # Django management
│   ├── requirements.txt
│   ├── Dockerfile      # Backend Dockerfile
├── frontend/           # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile      # (Optional) React Dockerfile
├── nginx/              # Nginx configuration
│   ├── nginx.conf
├── docker-compose.yml  # Manages all services
```

---

## 🛡️ Security Notes
- **Keep `SECRET_KEY` secure** (use `.env` instead of hardcoding in `settings.py`)
- **Use `DEBUG=False` in production**
- **Ensure JWT tokens are stored securely on the client side**

---

## 🔥 Future Enhancements
- **Live WebSocket updates for ride status**
- **Implement Google Maps API for real-time navigation**
- **Driver earnings and transaction history**

---

## 🤝 Contributing
1. **Fork the repo**
2. **Create a new branch** (`git checkout -b feature-name`)
3. **Commit changes** (`git commit -m "Added new feature"`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Create a Pull Request** 🚀

---

## 📜 License
This project is licensed under the **MIT License**.



