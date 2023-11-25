const getAllCustomers= require("../controllers/getAllCustomers");

const getAllCustomersHandler = async (req, res) => {
    try {

        const searchParams = {
            // parametros de busqueda
          };

        const customers = await getAllCustomers(searchParams);

        res.status(200).json(customers);
        
      } catch (error) {
        console.error('Error al recuperar los clientes:', error);
        res.status(500).json({ error: 'Error al recuperar los clientes' });
      }
};


module.exports = { getAllCustomersHandler }
