const express = require("express");
const axios = require("axios").default;

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// to store the subscriptions details
const subscriptions = [];

app.get("/", (req, res) => {
	res.send("Publisher server!");
});

// get the list of subscriptions
app.get("/subscriptions", (req, res) => {
	res.send(subscriptions);
});

// add a new subscription
app.post("/subscribe/:topic", (req, res) => {
	const { topic } = req.params;
	const { url } = req.body;
	subscriptions.push({
		url: url,
		topic: topic,
	});
	res.send({
		url,
		topic,
	});
});

// publish a message to a topic
app.post("/publish/:topic", async (req, res) => {
	const { topic } = req.params;
	const { message } = req.body;
	const payload = {
		topic: topic,
		data: message,
	};
	if (subscriptions.length > 0) {
		try {
			await Promise.all(
				subscriptions.map(async (subscription) => {
					if (subscription.topic === topic) {
						const headers = {
							"Content-Type": "application/json",
						};
						await axios.post(subscription.url, { headers, payload });
					}
				})
			);
			res.send("Topic published");
		} catch (error) {
			throw new Error(error);
		}
	} else {
		res.send("Topic published");
	}
});

app.listen(5000, () => {
	console.log("PUBLISHER: Server connected listening in port  5000!");
});
