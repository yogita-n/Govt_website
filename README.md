# Govt_website
Government Website for PVET school

navigate to frontend
 `cd frontend`

 run the frontend
 `npm run dev`

 navigate to backend
 `cd pvet-backend`

 run the backend
 `npm run dev`



 In the Localhost:
 Frontend: http://localhost:5173/
 Backend: http://localhost:5000/

 Admin Login:
 Email: [naikyogita28@gmail.com]
 Password: [yogita123]

create env file in frontend and backend

frontend:
```
VITE_API_URL=http://localhost:5000
```

backend:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/pvet
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@pvet.org
ADMIN_PASSWORD=changeme123
```