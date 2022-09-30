const config = require("../../utils/config")
const ProductsDAOMongoDB = require("../products/productsDAO.mongodb");

class ProductsDAOFactory {
    static get() {
        switch (config.TYPE_DB) {
            case 'mongodb':
                return new ProductsDAOMongoDB();
            default:
                return new ProductsDAOMongoDB();
        }
    }
}

module.exports = ProductsDAOFactory;