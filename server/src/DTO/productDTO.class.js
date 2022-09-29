class ProductDTO {
    constructor(id, name, photo, price, code, description, timestamp, stock) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.code = code;
        this.description = description;
        this.stock = stock;
        this.timestamp = timestamp;
    }

    getid() {
        return this.id;
    }

    setid(id) {
        return this.id = id;
    }

    gettitle() {
        return this.title;
    }

    settitle(title) {
        return this.title = title;
    }

    getcategory() {
        return this.category;
    }

    setcategory(category) {
        return this.category = category;
    }

    getthumbnail() {
        return this.thumbnail;
    }

    setthumbnail(thumbnail) {
        return this.thumbnail = thumbnail;
    }

    getprice() {
        return this.price;
    }

    setprice(price) {
        return this.price = price;
    }

}

module.exports = ProductDTO