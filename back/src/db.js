require('dotenv').config();
const { Sequelize } = require("sequelize");
const ClienteModel = require("./models/ClientesModel");
const CargosModel = require("./models/CargosModel");


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
  });

  const Cliente = ClienteModel(sequelize);
  const Cargo = CargosModel(sequelize);

  
  Cliente.hasMany(Cargo, { foreignKey: 'customer_id' });
  Cargo.belongsTo(Cliente, { foreignKey: 'customer_id' });

  sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
  })
  .catch(error => {
    console.error('Error al sincronizar las tablas:', error);
  });

  module.exports = { sequelize, Cliente, Cargo };

