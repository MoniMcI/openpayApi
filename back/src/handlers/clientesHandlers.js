const { createCustomer } = require('../controllers/createCliente');

const createCustomerHandler = async (req, res) => {
  const { name, email, requires_account } = req.body;

  try {
    createCustomer(name, email, requires_account, (error, customer) => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(200).json(customer);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createCustomerHandler,
};
