const { Router } = require("express")

const { createCustomerHandler } = require('../handlers/clientesHandlers');
const { getCustomerByIdHandler } = require('../handlers/getCustomerByIdHandler');
const { getAllCustomersHandler } = require('../handlers/getAllCustomersHandler');
const { updateCustomerByIdHandler } = require('../handlers/updateCustomerByIdHandler');
const { deleteCustomerByIdHandler } = require("../handlers/deleteCustomerByIdHandler");
const { generateChargeHandler } = require("../handlers/generateChargeHandler");
const { getCustomerChargesHandler } = require("../handlers/getCustomerChargesHandler");

const clientesRouter = Router()

  clientesRouter.get('/', getAllCustomersHandler);

  clientesRouter.get('/:id', getCustomerByIdHandler);
  
  clientesRouter.post('/', createCustomerHandler);

  clientesRouter.put('/:id', updateCustomerByIdHandler);

  clientesRouter.delete('/:id', deleteCustomerByIdHandler);

  clientesRouter.post('/cargo/:id', generateChargeHandler);

  clientesRouter.get('/cargo/:id', getCustomerChargesHandler);


  module.exports = clientesRouter;
  
 