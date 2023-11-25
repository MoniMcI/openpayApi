const updateCustomerById = require("../controllers/updateCustomerById");

const updateCustomerByIdHandler = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedCustomer = await updateCustomerById(id, updatedData);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

module.exports = {
  updateCustomerByIdHandler
};
