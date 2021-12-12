const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Subscriber 8000!");
});

app.post("/", (req, res) => {
    const { topic, data } = req.body.payload;
    console.log(`SUBSCRIBER 1: ${topic} -----> ${data}`);
    res.send("Request was successful");
})
app.listen(8000, () => {
	console.log("SUBSCRIBER: Server connected listening in port 8000!");
});
