const ObjectId = require("mongoose").Types.ObjectId;

class ContainerUserMongo {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const searched = await this.model.find();
      return searched;
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    const object = {
      ...obj,
      timeStamp,
    };
    const newUser = new this.model(object);
    const Saved = await newUser.save();
    if (newUser.error) {
      return { error: newUser.error };
    } else {
      return Saved;
    }
  }

  async getByID(id) {
    try {
      const search = await this.model.find({ email: { $eq: id } });
      if (search.length === 0) {
        return { error: "Id not found" };
      } else {
        return search;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ContainerUserMongo;
