const getCustomerCharges= require("../controllers/getCustomerCharges");

const getCustomerChargesHandler = async (req, res) => {
    const { id } = req.params;
  
    try {
        const charges = await getCustomerCharges(id);
    
   
        return res.status(200).json(charges);

      } catch (error) {
        console.error('Error al recuperar el cliente por ID:', error);
        return res.status(500).json({ error: 'Error al recuperar el cliente por ID' });
      }
  };
  
  module.exports = {
    getCustomerChargesHandler,
  };