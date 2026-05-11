const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const applicationRoutes = require('./interface/routes/applicationRoutes');
const sequelize = require('./infrastructure/database');

const rateLimit = require('express-rate-limit');

const app = express();

// Security middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Permite carregar recursos de outras origens se necessário
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: { error: 'Muitas requisições vindas deste IP, tente novamente mais tarde.' }
});

app.use('/api/', limiter);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/applications', applicationRoutes);

// Static files for uploads (optional if using direct download)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
