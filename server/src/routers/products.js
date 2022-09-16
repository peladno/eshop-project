const express = require("express");
const router = express.Router();
const DAO = require("../../model/products.model");

function auth(request, resolve, next) {
  if ("admin" in request.headers) next();
  else {
    resolve.status(400);
    resolve.send("No admin");
  }
}

//get all products
router.get("/", async (request, resolve) => {
  try {
    const data = await DAO.getAll();
    resolve.send(data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//get product by id
router.get("/:id", async (request, resolve) => {
  const id = request.params.id;

  try {
    const data = await DAO.getByID(id);
    if (data === undefined) {
      resolve.send(data);
    } else {
      resolve.send(data);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
    
  }
});

//delete product by id
router.delete("/:id", auth, async (request, resolve) => {
  const id = request.params.id;
  try {
    const deleted = await DAO.deleteById(id);
    resolve.send({ message: "Product deleted", deleted });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//save product
router.post("/", auth, async (request, resolve) => {
  try {
    const { name, code, description, photo, stock, price } = request.body;
    const data = await DAO.save({
      name,
      code,
      description,
      photo,
      stock,
      price,
    });
    resolve.send(data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

router.put("/:id", auth, async (request, resolve) => {
  try {
    const id = request.params.id;
    const newProduct = request.body;
    const data = await DAO.updateItems(id, newProduct);
    resolve.send(data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

module.exports = router;
