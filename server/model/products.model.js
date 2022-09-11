const {
	mongoose,
	Schema,
	model
} = require('mongoose')

const productsCollection = 'products'
const ProductSchema = new Schema({
	timestamp: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	code: {
		type: Number,
		required: true
	},
	photo: {
		type: String,
		required: true},
	price: {
		type: Number,
		required: true,
		default: 0
	},
	stock: {
		type: Number,
		required: true,
		default: 1
	}
})


const productModel = model(productsCollection, ProductSchema)

const ContenedorMongo = require("../contenedores/mongoContainer")
const productsDAO = new ContenedorMongo(productModel)

module.exports = productsDAO