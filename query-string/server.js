import express from "express";
import { apples } from "./apples.js";
const app = express();

app.get("/", function (_, response) {
  response.json("root route");
});

// using localhost:8080/apples?sort=asc
// sorts the apples
app.get("/apples", function (request, response) {
  const filteredApples = apples;
  const sort = request.query.sort;
  if (sort === "asc") {
    // sort apples
    filteredApples = apples.sort();
  } else if (sort === "desc") {
    //sort apples in reverse
    filteredApples = apples.sort().reverse();
  }
  response.json(filteredApples);
});

app.listen(8080, function () {
  console.log("Server starting on port 8080");
});
