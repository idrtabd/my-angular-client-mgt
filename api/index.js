import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import clientsRoutes from './routes/clients.js';
import 'dotenv/config';
////
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // this allows all origins, you can specify a specific origin if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,


}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/clients', clientsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});