const config = require("../../utils/config")

class CartDAOFactory {
    static get() {
        switch (config.TYPE_DB) {
            case 'mongodb':
                return new CartDAOMongoDB();
            default:
                return new CartDAOMongoDB();
        }
    }
}

module.exports = CartDAOFactory;