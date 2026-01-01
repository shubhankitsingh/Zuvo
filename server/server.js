import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/DB.js';

//initialize express app
const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});