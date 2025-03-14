# 🏥 **EyeCamp - Backend**

🚀 **EyeCamp Backend** is a robust, scalable, and secure API built with **Node.js, Express, and MongoDB**, designed to manage patient registrations, users, and reports efficiently.

---

## 🌟 **Features**
- 🔐 **JWT Authentication** for secure user login & access control
- ⚡ **Optimized Performance** using Node.js & Express
- 🗂️ **MongoDB Integration** for scalable & flexible data storage
- 🖥️ **RESTful API** design for smooth frontend integration
- 📊 **Role-based Access Control** for admins & users
- 🐳 **Docker Support** for easy deployment

---

## 📂 **Project Structure**
\`\`\`
eyecamp-backend/
│── config/          # Configuration files (DB, JWT, etc.)
│── controllers/     # API Controllers
│── models/         # Mongoose Models
│── routes/         # API Routes
│── .dockerignore   # Docker Ignore File
│── .gitignore      # Git Ignore File
│── Dockerfile      # Docker Deployment Config
│── package.json    # Node Dependencies
│── server.js       # Entry Point
└── README.md       # Project Documentation
\`\`\`

---

## 🔧 **Installation & Setup**

### 1️⃣ Clone the Repository
\`\`\`bash
git clone https://github.com/MurugananthamB/eyecamp-backend.git
cd eyecamp-backend
\`\`\`

### 2️⃣ Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3️⃣ Set Up Environment Variables
Create a \`.env\` file in the root directory and add:
\`\`\`
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
PORT=5000
\`\`\`

### 4️⃣ Run the Server
\`\`\`bash
npm start
\`\`\`
or use Nodemon for development:
\`\`\`bash
npm run dev
\`\`\`
🟢 Server will be running at **http://localhost:5000/**

---

## 📡 **API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| \`POST\` | \`/api/users/register\` | Register a new user |
| \`POST\` | \`/api/users/login\` | User login & token generation |
| \`GET\` | \`/api/patients\` | Get all patient records |
| \`POST\` | \`/api/patients/add\` | Add a new patient |

📌 _Check the full API documentation **[here](#)**_

---

## 🐳 **Docker Setup**
To build and run using Docker:
\`\`\`bash
docker build -t eyecamp-backend .
docker run -p 5000:5000 eyecamp-backend
\`\`\`

---

## 🎯 **Contributing**
1. Fork the repository  
2. Create a feature branch (\`git checkout -b feature-name\`)  
3. Commit changes (\`git commit -m "Added feature XYZ"\`)  
4. Push the branch (\`git push origin feature-name\`)  
5. Open a Pull Request  

---

## 📜 **License**
This project is licensed under the **MIT License**.

---

### 💡 **Need Help?**
For any issues, feel free to open an **[Issue](https://github.com/MurugananthamB/eyecamp-backend/issues)** or reach out! 🚀

