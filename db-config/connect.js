const Sequelize = require('sequelize');

// database connection
const connection = new Sequelize(
  'database-name',
  'root',
  'password',
  {
    host: 'host',
    dialect: 'mysql',
  },
);

module.exports = connection;
