const Openpay = require('openpay');
const { Cargo } = require('../db');
require('dotenv').config(); 

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);

const generateCharge = async (customerId, chargeRequest) => {
  try {
    // guardar openpay
    const charge = await new Promise((resolve, reject) => {
      openpay.customers.charges.create(customerId, chargeRequest, (error, charge) => {
        if (error) {
          reject(error);
        } else {
          resolve(charge);
        }
      });
    });

    // guardar bd
    await Cargo.create({
      customer_id: customerId,
      amount: charge.amount,
      description: charge.description,
      order_id: charge.order_id,
      due_date: charge.due_date,
    });

    return charge;
  } catch (error) {
    console.error('Error al generar el cargo en tienda:', error.message);
    throw error;
  }
};

module.exports = {
  generateCharge
};
