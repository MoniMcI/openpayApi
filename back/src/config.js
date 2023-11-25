//configuracion de Openpay para sandbox

const Openpay = require('openpay');

const OPENPAY_MERCHANT_ID = 'mqs8t32yrgryhk7yza4w'; // Reemplaza con tu ID de comercio
const OPENPAY_PRIVATE_KEY = 'sk_9e2e4ca53496413fa0bdddc11b79ac62'; // Reemplaza con tu llave privada

const openpay = new Openpay(OPENPAY_MERCHANT_ID, OPENPAY_PRIVATE_KEY);
openpay.setProductionReady(false); // Ambiente de pruebas

module.exports = openpay;
