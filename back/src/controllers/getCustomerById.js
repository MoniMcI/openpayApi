const Openpay = require('openpay');
const { Cliente } = require('../db');
require('dotenv').config();

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);


const getCustomerById = async (customerId) => {
    try {
      const customer = await new Promise((resolve, reject) => {
        openpay.customers.get(customerId, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
  
      return customer;
    } catch (error) {
      console.error('Error al recuperar el cliente por ID:', error);
      throw error;
    }
  };

module.exports = getCustomerById;