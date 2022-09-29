const config = require("../../utils/config")

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