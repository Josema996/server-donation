const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "APP_USR-3058901314049000-071300-bab793c76b2b8ca6e794ed5196a423d8-280933602",
});


app.use(express.json());
app.use(cors());
app.get("/", function (req, res) {
    res.send("server is working")
});

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://127.0.0.1:5173/",
			"failure": "http://127.0.0.1:5173/",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});


app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});