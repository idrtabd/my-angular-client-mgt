// routes/appointments.js
import express from 'express';
import pool from '../db.js';
import 'dotenv/config';

const router = express.Router();

// Create new appointment
router.post('/:clientId', async (req, res) => {
    try {
      const { reason, status, notes, startDate, endDate } = req.body;
      const { clientId } = req.params;
  
      if (!reason || !startDate || !endDate) {
        return res.status(400).json({ error: 'Reason, start date, and end date are required' });
      }
  
      const formattedStartDate = formatIsoToMySQLDatetime(startDate);
      const formattedEndDate = formatIsoToMySQLDatetime(endDate);
  
      const [result] = await pool.query(
        `INSERT INTO appointment (client_id, reason, status, notes, start_date, end_date) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [clientId, reason, status, notes, formattedStartDate, formattedEndDate]
      );
  
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  // Helper function to normalize status
  function formatStatus(status) {
    const trimmed = status.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  function formatIsoToMySQLDatetime(isoString) {
    const date = new Date(isoString);
    
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

// Get all appointments for a client
router.get('/client/:id', async (req, res) => {
    try {
      const clientId = req.params.id;
  
      if (!clientId) {
        return res.status(400).json({ error: 'clientId is required' });
      }
  
      const [rows] = await pool.query(
        'SELECT * FROM appointment WHERE client_id = ? ORDER BY start_date ASC',
        [clientId]
      );
  
      // Format start_date and end_date to ISO strings
      const formattedAppointments = rows.map(appt => ({
        ...appt,
        start_date: appt.start_date ? appt.start_date.toISOString() : null,
        end_date: appt.end_date ? appt.end_date.toISOString() : null,
      }));
  
      res.json(formattedAppointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // delete appointment
router.delete('/:id', async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      if (!appointmentId) {
        return res.status(400).json({ error: 'appointmentId is required' });
      }
  
      const [result] = await pool.query('DELETE FROM appointment WHERE id = ?', [appointmentId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });   

export default router;



