const Openpay = require('openpay');
const { Cliente } = require('../db');
require('dotenv').config();

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);


const getCustomerCharges = async (customerId) => {
    try {
      const customerCharges = await new Promise((resolve, reject) => {
        openpay.customers.charges.list(customerId, (error, result) => {
            if (error) {
                if (error.httpCode && error.httpCode >= 400) {
                  reject(`Error de OpenPay: ${error.description}`);
                } else {
                  reject(error);
                }
              } else {
                resolve(result);
              }
        });
      });
  
      return customerCharges;
    } catch (error) {
      console.error('Error al recuperar los cargos del cliente ID:', error);
      throw error;
    }
  };

module.exports = getCustomerCharges;