const logger = require("../logger/logger");

const ruteNotFound = (req, res, next) => {
    logger.warn(`Error -2 - Ruta ${req.url}, Método ${req.method} no implementado.`)
    return res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.url}, Método ${req.method} no implementado.`
    });
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    ruteNotFound, isAuth
}