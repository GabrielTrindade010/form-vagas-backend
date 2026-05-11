const app = require('../src/app');
const sequelize = require('../src/infrastructure/database');
const { setupAssociations } = require('../src/infrastructure/database/associations');

// Force IPv4 DNS resolution globally
require('dns').setDefaultResultOrder('ipv4first');

let isDbConnected = false;

module.exports = async (req, res) => {
  if (!isDbConnected) {
    try {
      setupAssociations();
      await sequelize.authenticate();
      // In serverless, we might not want to sync on every request, 
      // but for simplicity in this dev phase:
      await sequelize.sync({ alter: true });
      isDbConnected = true;
      console.log('Database connected and synchronized in serverless function');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
  
  // Forward to Express app
  return app(req, res);
};
