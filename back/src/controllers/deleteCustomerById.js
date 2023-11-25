require('dotenv').config();
const Openpay = require('openpay');
const { Cliente } = require('../db');

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);

const deleteCustomerById = async (customerId) => {
  try {
    // Borrar de openpay
    await new Promise((resolve, reject) => {
      openpay.customers.delete(customerId, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    //borrar de la bd local
    const existingCustomer = await Cliente.findByPk(customerId);
    if (existingCustomer) {
      await existingCustomer.destroy();
    }

    return { success: true };

  } catch (error) {
    console.error('Error al borrar el cliente:', error);
    throw error; 
  }
};

module.exports = deleteCustomerById;
