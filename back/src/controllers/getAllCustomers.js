const Openpay = require('openpay');
const { Cliente } = require('../db');
require('dotenv').config();

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);


const getAllCustomers = (searchParams) => {
    return new Promise((resolve, reject) => {
      openpay.customers.list(searchParams, (error, customers) => {
        if (error) {
          reject(error);
        } else {
          resolve(customers);
        }
      });
    });
  };

module.exports = getAllCustomers;