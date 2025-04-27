// routes/clients.js
import express from 'express';
import pool from '../db.js';
import 'dotenv/config';

const router = express.Router();

// Get all client
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM client');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get client by ID
router.get('/:id', async (req, res) => {
  console.log('Fetching client with ID:', req.params.id);
  
  try {
    const [rows] = await pool.query('SELECT * FROM client WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(git).json({ error: 'Client not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create client
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, company, notes } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const [result] = await pool.query(
      'INSERT INTO client (name, email, phone, address, company, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, company, notes]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;