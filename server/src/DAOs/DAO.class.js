const CustomError = require("./customError.class");

class DAO {
  async listAll() {
    throw new CustomError(500, "Error implementing 'listAll'");
  }

  async list() {
    throw new CustomError(500, "Error implementing 'list'");
  }

  async save() {
    throw new CustomError(500, "Error implementing 'save'");
  }

  async update() {
    throw new CustomError(500, "Error implementing 'update'");
  }

  async delete() {
    throw new CustomError(500, "Error implementing 'delete'");
  }

  async deleteAll() {
    throw new CustomError(500, "Error implementing 'deleteAll'");
  }

  async clientCart() {
    throw new CustomError(500, "Error implementing 'clientCart'");
  }

  async saveProductToCart() {
    throw new CustomError(500, "Error implementing 'saveProductToCart'");
  }

  async updateCart() {
    throw new CustomError(500, "Error implementing 'updateCart'");
  }

  async deleteCart() {
    throw new CustomError(500, "Error implementing 'deleteCart'");
  }
}

module.exports = DAO;
