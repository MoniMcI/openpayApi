const { Router } = require("express");
const clientesRouter = require("./clientesRouter");



const mainRouter = Router();

mainRouter.use("/clientes", clientesRouter);


module.exports = mainRouter;