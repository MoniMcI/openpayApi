const getCustomerById= require("../controllers/getCustomerById");

const getCustomerByIdHandler = async (req, res) => {
    const { id } = req.params;
  
    try {
        const customer = await getCustomerById(id);
    
        if (!customer) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
    
        return res.status(200).json(customer);
      } catch (error) {
        console.error('Error al recuperar el cliente por ID:', error);
        return res.status(500).json({ error: 'Error al recuperar el cliente por ID' });
      }
  };
  
  module.exports = {
    getCustomerByIdHandler,
  };