class ProductDTO {
    constructor(_id, name, photo, price, code, description, timestamp, stock) {
        this._id = _id;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.code = code;
        this.description = description;
        this.stock = stock;
        this.timeStamp = timestamp;
    }
}

module.exports = ProductDTO