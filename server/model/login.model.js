const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//const bcrypt = require("bcrypt");

const usersCollection = "users";

const UserSchema = new Schema({
    timestamp: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

/*
UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const isMatch = await bcrypt.compare(
    password.toString(),
    this.password.toString()
  );
  return isMatch;
};

module.exports = model("User", UserSchema);*/


const userModel = model(usersCollection, UserSchema)

const ContenedorMongo = require("../contenedores/mongoUserContainer")
const usersDAO = new ContenedorMongo(userModel)

module.exports = usersDAO
