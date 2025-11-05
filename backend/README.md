# Virtual Hair Try-On Backend

This is the backend for the Virtual Hair Try-On application built with Node.js, Express, and MongoDB.

## Features

- API endpoints for hairstyles, uploads, and previews
- File upload handling with Multer
- JSON-based storage for hairstyles and previews (can be switched to MongoDB)
- CORS enabled for frontend communication

## Setup Instructions

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the backend directory with:

   ```
   MONGO_URI=mongodb+srv://praveshghj2:ZVoQ98Qagxa0Ajk7@clusterone.xnpswhc.mongodb.net/virtual-hair-tryon
   PORT=1200
   BASE_URL=http://localhost:1200
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:1200`.

## API Endpoints

- `GET /api/hairstyles?length=short` - Get hairstyles by length
- `POST /api/upload` - Upload user image
- `POST /api/previews` - Save a preview
- `GET /api/previews` - Get all saved previews

## Technologies Used

- Node.js
- Express.js
- Multer for file uploads
- Mongoose for MongoDB (optional, currently using JSON files)
- CORS
