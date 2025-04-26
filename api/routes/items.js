import express from 'express';
import Database from 'better-sqlite3';

const router = express.Router();
const db = new Database('database.db');

// Get all items
router.get('/', (req, res) => {
  const items = db.prepare('SELECT * FROM items').all();
  res.json(items);
});

// Add item
router.post('/', (req, res) => {
  const { name } = req.body;
  const insert = db.prepare('INSERT INTO items (name) VALUES (?)');
  const result = insert.run(name);
  res.json({ id: result.lastInsertRowid, name });
});

export default router;