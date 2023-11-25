require('dotenv').config();
const Openpay = require('openpay');
const { Cliente } = require('../db');


const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);

const updateCustomerById = async (customerId, updatedData) => {
  try {
    console.log("datos a actualizar", updatedData);
    const updatePromise = () => {
      return new Promise((resolve, reject) => {
        openpay.customers.update(customerId, updatedData, (error, customer) => {
          if (error) {
            console.error('Error al actualizar el cliente en Openpay:', error);
            console.log('Detalles del error de Openpay:', error.error);
            reject(error);
          } else {
            console.log('Cliente actualizado en Openpay:', customer);
            resolve(customer);
          }
        });
      });
    };

    // bd local
    const existingCustomer = await Cliente.findByPk(customerId);

    if (existingCustomer) {
      const { address, ...restData } = updatedData;
      const updatedAddress = existingCustomer.address ? { ...existingCustomer.address, ...address } : address;
      const updatedCustomer = await existingCustomer.update({ ...restData, address: updatedAddress });
      return updatedCustomer;

    } else {
      // Si no existe, crear un nuevo registro
      await updatePromise(); 
      const { address, ...restData } = updatedData;
      const newCustomer = await Cliente.create({ id: customerId, ...restData, ...address });
      return newCustomer;
    }

    //return { success: true };

  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error; 
  }
};

module.exports = updateCustomerById;
