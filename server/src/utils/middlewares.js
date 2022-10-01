const logger = require("../logger/logger");

const ruteNotFound = (req, res, next) => {
  logger.warn(
    `Error -2 - Ruta ${req.url}, Método ${req.method} no implementado.`
  );
  return res.status(404).json({
    error: -2,
    descripcion: `Ruta ${req.url}, Método ${req.method} no implementado.`,
  });
};

const isAdmin = (request, resolve, next) =>{
  if ("admin" in request.headers) next();
  else {
    resolve.status(400);
    resolve.send("No admin");
  }
}


module.exports = {
  ruteNotFound,
  isAdmin
};
