const Openpay = require('openpay');
const { Cliente } = require('../db');
require('dotenv').config();

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);

const createCustomer = (name, email, requires_account, callback) => {
  try {
    const customerRequest = {
      name,
      email,
      requires_account,
    };

    
    openpay.customers.create(customerRequest, async (error, openpayCustomer) => {
      if (error) {
        console.error('Error al crear el cliente en OpenPay:', error);
        if (callback) {
          callback(error);
        }
        throw new Error('Error al crear el cliente en OpenPay');
      }   

      console.log('Openpay Customer devuelto:', openpayCustomer);
      console.log("openpay-id", openpayCustomer.id)

      try {
        const createdCliente = await Cliente.create({
          id: openpayCustomer.id,
          name: openpayCustomer.name,
          email: openpayCustomer.email,
        });

        if (callback) {
          callback(null, createdCliente);
        }
      } catch (dbError) {
        console.error('Error al guardar el cliente en la base de datos:', dbError);
        if (callback) {
          callback(dbError);
        }
        //throw new Error('Error al guardar el cliente en la base de datos');
        console.error('Error al guardar el cliente en la base de datos:', dbError);
      }
    });
  } catch (error) {
    console.error('Error al crear el cliente en OpenPay:', error);
    if (callback) {
      callback(error);
    }
    throw new Error('Error al crear el cliente en OpenPay');
  }
};

module.exports = { createCustomer };
