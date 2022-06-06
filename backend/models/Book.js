const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = new Schema(
	{
		name: {
			type: String,
		},
		auther: {
			type: String,
		},
		price: {
			type: Number,
		},
		quantity: {
			type: Number,
		},
	},
	{
		collection: "books",
	}
);

module.exports = mongoose.model("Book", bookSchema);
