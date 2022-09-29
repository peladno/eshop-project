const CustomError = require("./customError.class")

module.exports = class DBClient {
    async connect() {
        throw new CustomError(500, "Error implementing 'connect'")
    }

    async disconnect() {
        throw new CustomError(500, "Error implementing 'disconnect'")
    }
}