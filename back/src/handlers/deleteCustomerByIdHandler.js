const deleteCustomerById = require('../controllers/deleteCustomerById');

const deleteCustomerByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteCustomerById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error al borrar el cliente:', error);
    if (error.description) {
      return res.status(500).json({ error: error.description });
    } else {
      return res.status(500).json({ error: 'Error al borrar el cliente' });
    }
  }
};

module.exports = { deleteCustomerByIdHandler };
