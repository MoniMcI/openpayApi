const Openpay = require('openpay');
const { Cliente, Cargo } = require('../db');
require('dotenv').config();

const OPENPAY_MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID;
const OPENPAY_PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY;

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY, false);

const getAllCustomers = async (searchParams) => {
  try {
    const openPayCustomers = await new Promise((resolve, reject) => {
      openpay.customers.list(searchParams, (error, customers) => {
        if (error) {
          reject(error);
        } else {
          resolve(customers);
        }
      });
    });

      //sincronizar clientes bd
    for (const openPayCustomer of openPayCustomers) {
      const existingCustomer = await Cliente.findOne({
        where: { id: openPayCustomer.id }
      });

      if (!existingCustomer) {
        await Cliente.create({
          id: openPayCustomer.id,
          name: openPayCustomer.name,
          last_name: openPayCustomer.last_name,
          email: openPayCustomer.email,
          phone_number: openPayCustomer.phone_number,
          city: openPayCustomer.address ? openPayCustomer.address.city : null,
          state: openPayCustomer.address ? openPayCustomer.address.state : null,
          line1: openPayCustomer.address ? openPayCustomer.address.line1 : null,
          postal_code: openPayCustomer.address ? openPayCustomer.address.postal_code : null,
          country_code: openPayCustomer.address ? openPayCustomer.address.country_code : null,

        });
      }

      //sincronicar cargos bd

      const openPayCharges = await new Promise((resolve, reject) => {
        openpay.customers.charges.list(openPayCustomer.id, (error, charges) => {
          if (error) {
            reject(error);
          } else {
            resolve(charges);
          }
        });
      });

      for (const openPayCharge of openPayCharges) {
        const existingCharge = await Cargo.findOne({
          where: { id: openPayCharge.id }
        });

        if (!existingCharge) {
          await Cargo.create({
            id: openPayCharge.id,
            amount: openPayCharge.amount,
            description: openPayCharge.description,
            order_id: openPayCharge.order_id,
            due_date: openPayCharge.due_date,

            customer_id: openPayCharge.customer_id,
          });
        }
      }
    }

    return openPayCustomers;
  } catch (error) {
    console.error('Error al obtener y sincronizar clientes y cargos:', error);
    throw error;
  }
};

module.exports = getAllCustomers;
