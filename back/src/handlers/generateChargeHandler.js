const { generateCharge } = require("../controllers/generateCharge");

const generateChargeHandler = async (req, res) => {
  const { id } = req.params;
  const newCharge= req.body;

  try {
    const charge = await generateCharge(id,newCharge);
    res.status(200).json(charge);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

module.exports = {
  generateChargeHandler
};
