const config = require("../../utils/config")
const UserDAOMongoDB = require("../user/userDAO.mongodb")

class UserDAOFactory {
    static get() {
        switch (config.TYPE_DB) {
            case 'mongodb':
                return new UserDAOMongoDB();
            default:
                return new UserDAOMongoDB();
        }
    }
}

module.exports = UserDAOFactory;