// import express from node_modules
import express, { response } from "express";

//instantiate express app (make instance of)
const app = express();

// tell express to expect information in the body of the request
app.use(express.json());

const fruit = [
  { name: "banana", colour: "yellow", vegetable: false },
  { name: "pineapple", colour: "Yellow", vegetable: false },
  { name: "cherry", colour: "red", vegetable: false },
  { name: "strawberry", colour: "red", vegetable: false },
  { name: "tomato", colour: "tomato", vegetable: true },
  { name: "orange", colour: "orange", vegetable: false },
  { name: "lime", colour: "green", vegetable: false },
];

// create GET endpoint (http://localhost:8080/)
app.get("/", function (request, response) {
  //response.send("You are looking at my root route as HTML");  returns HTML
  response.json("You are looking at my root route as JSON");
});

//GET endpoint -- usually for reading information
app.get("/fruits", function (request, response) {
  response.json(fruit);
});

app.get("/messages", function (request, response) {
  response.json({ message: "Hello GET, World!" });
});

//POST endpoint -- usually for creating information for databases
app.post("/fruits", function (request, response) {
  response.json("Fruit endpoint");
});

app.post("/messages", function (request, response) {
  response.json({ message: "Hello POST, World!" });
});

// start express server on port 8080
app.listen(8080, function () {
  console.log("app is running on port 8080");
});
