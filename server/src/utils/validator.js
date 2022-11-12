function validate(validation) {
  return (req, res, next) => {
    try {
      validation(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

function validationProduct(data) {
  const { name, price, photo, category, stock, code, description } = data;
  const validCharacters = /^[a-zA-Z@/.0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;
  if (
    !name ||
    !price ||
    !photo ||
    !category ||
    !stock ||
    !code ||
    !description
  ) {
    throw new Error(
      "Product fields must have: name, price, photo, category, stock, code, description"
    );
  }
  /*if (typeof price === "number") {
    throw new Error("Price must be a number");
  }

  if (typeof stock === "number") {
    throw new Error("Stock must be a number");
  }

  if (typeof code === "string") {
    throw new Error("Code must be a string");
  }*/

  if (stock <= 0) {
    throw new Error("Stock must be higher than 0");
  }
  if (price <= 0) {
    throw new Error("Price must be higher than 0");
  }
  if (!validCharacters.exec(name)) {
    throw new Error("Name must to be only letters, number and spaces");
  }

  if (!validCharacters.exec(description)) {
    throw new Error("Description must to be only letters, number and spaces");
  }
  /*if (!validCharacters.exec(photo)) {
    throw new Error("Photo must  be and url");
  }*/
  if (!validCharacters.exec(category)) {
    throw new Error("Categpry must has only letters, numbers and /");
  }
}

function validationUserLogin(data) {
  const { username, password } = data;
  const validCharacters = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;

  if (!username || !password) {
    throw new Error("User fields must have: username, password.");
  }
}

function validationUser(data) {
  const { email, name, address, phone, photo, password, username } = data;
  const validCharacters = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú -:/\s]+$/;
  const emailvalidCharacters = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (
    !email ||
    !name ||
    !address ||
    !phone ||
    !photo ||
    !password ||
    !username
  ) {
    throw new Error(
      "User fields must have: email, name, address, phone, photo, password, username."
    );
  }
  if (!emailvalidCharacters.exec(email)) {
    throw new Error("Email must has number letters and @");
  }
  if (!validCharacters.exec(name)) {
    throw new Error("Name must to be only letters, number and spaces");
  }
  if (!validCharacters.exec(address)) {
    throw new Error("Address must to be only letters, number and spaces");
  }
  if (!validCharacters.exec(photo)) {
    throw new Error("Photo must be a url");
  }
}

module.exports = {
  validate,
  validationProduct,
  validationUser,
  validationUserLogin,
};
