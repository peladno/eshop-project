const config = require("../../utils/config")
const OrderDAOMongoDB = require("../orders/orderDAO.mongodb")

class CartDAOFactory {
    static get() {
        switch (config.TYPE_DB) {
            case 'mongodb':
                return new OrderDAOMongoDB();
            default:
                return new OrderDAOMongoDB();
        }
    }
}

module.exports = CartDAOFactory;