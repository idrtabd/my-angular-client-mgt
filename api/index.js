import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Database from 'better-sqlite3';
import itemsRoutes from './routes/items.js';

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database('database.db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/items', itemsRoutes);

// Database init
db.exec(`CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});