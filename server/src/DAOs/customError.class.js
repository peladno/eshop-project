class CustomError {
    constructor(code, description, detail) {
        this.code = code;
        this.description = description;
        this.detail = detail;
    }
}

module.exports = CustomError