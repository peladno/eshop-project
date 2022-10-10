const URL = "http://localhost:8080";
const request = require("supertest")(URL);
const expect = require("chai").expect;

const id = "633d14f2f7d14e0103a9017d"; //id should be _id of the product in mongoDB
const url = "/api/products";
const incorrectURL = "/api/produc";
const urlId = `/api/products/${id}`;
const urlIdnonExistence = `/api/productos/50`;

const product = {
  //you should use same product on mongoDB
  _id: "633d14f2f7d14e0103a9017d",
  timeStamp: "5/10/2022, 2:24:02",
  name: "Nintendo",
  description: "Consola nintendo",
  code: 220699,
  photo:
    "https://i.picsum.photos/id/971/200/200.jpg?hmac=xcJY-VNIH_UD01lMlLi4mADmQrLTgoEE2_NYEhL3VQA",
  price: 500000,
};

const editedProduct = {
  name: "NintendoSwitch",
  description: "Consola nintendo",
  code: 220699,
  photo:
    "https://i.picsum.photos/id/971/200/200.jpg?hmac=xcJY-VNIH_UD01lMlLi4mADmQrLTgoEE2_NYEhL3VQA",
  price: 500000,
};

const newProduct = {
  name: "Notebook",
  description: "Notebook lenovo",
  code: 666,
  photo:
    "https://i.picsum.photos/id/971/200/200.jpg?hmac=xcJY-VNIH_UD01lMlLi4mADmQrLTgoEE2_NYEhL3VQA",
  price: 900000,
  stock: 99,
};

describe("Test API REST", () => {
  describe(` 1- test ${URL}${incorrectURL} GET non existence`, () => {
    it("Should return status 404.", async () => {
      const response = await request.get(urlIdnonExistence);
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(404);
    });
  });

  describe(` 2- test ${url} GET`, () => {
    it(`Should return status 200`, async () => {
      const response = await request.get(url);
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(200);
    });
  });

  describe(` 3- test ${urlId} GET /:id`, () => {
    it("Should return status 200", async () => {
      const response = await request.get(urlId);
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(200);
      const producto = response.body;
      expect(producto).to.include.keys("name", "price", "photo", "_id", "code");
      expect(producto._id).to.eql(product._id);
      expect(producto.name).to.eql(product.name);
      expect(producto.price).to.eql(product.price);
      expect(producto.photo).to.eql(product.photo);
      expect(producto.code).to.eql(product.code);
    });
  });

  describe(` 4- test ${urlIdnonExistence} GET /:id no existe`, () => {
    it("Should return 404", async () => {
      const response = await request.get(urlIdnonExistence);
      console.log("Respuesta: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(404);
    });
  });

  describe(` 5- test ${url} POST`, () => {
    it("Should add a product", async () => {
      const response = await request
        .post(url)
        .set("admin", "true")
        .send(newProduct);
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(201);
    });
  });

  describe(` 6- test ${url} POST`, () => {
    it("Should'nt add a empty product.", async () => {
      const response = await request.post(url).set("admin", "true").send({});
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(400);
    });
  });

  describe(`7- test ${url}/${product._id} PUT`, () => {
    it("Modify product by id", async () => {
      const response = await request
        .put(url + `/${product._id}`)
        .set("admin", "true")
        .send(editedProduct);
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(200);
    });
  });

  describe(`8-  test ${urlId} DELETE`, () => {
    it("Should delete product by id)", async () => {
      const response = await request.delete(urlId).set("admin", "true").send();
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(200);
    });
  });

  describe(`9- test ${urlIdnonExistence} PUT, product non existence`, () => {
    it("Shouldn't update anything, and return status 404", async () => {
      const response = await request.put(urlIdnonExistence).send(product);
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(404);
    });
  });

  describe(`10- test ${urlIdnonExistence} DELETE, product non existence`, () => {
    it("Shouldn't delete anything, and return status 404", async () => {
      const response = await request.delete(urlIdnonExistence).send();
      console.log("Response: ", response.body);
      console.log("Response Status: ", response.status);
      expect(response.status).to.eql(404);
    });
  });
});
