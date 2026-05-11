const app = require('./app');
const sequelize = require('./infrastructure/database');
const { setupAssociations } = require('./infrastructure/database/associations');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    setupAssociations();
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync models (in production use migrations)
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

start();
