import express, { response } from "express";
import cors from "cors"; //cross origin resource sharing
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//browser specific variables defined with double underscore
const app = express();
app.use(cors());
app.use(express.json()); //allows body in the request

// assign filepaths
const filePathPc = path.join(__dirname, "pc.json");
const filePathMonitor = path.join(__dirname, "monitor.json");
const filePathPeriferal = path.join(__dirname, "periferals.json");

app.get("/", function (request, response) {
  response.json("root route");
});

function handleGetRequest(filePath) {
  return async function (request, response) {
    response.sendFile(filePath); //local json response
  };
}

app.get("/pc", handleGetRequest(filePathPc));
app.get("/monitor", handleGetRequest(filePathMonitor));
app.get("/periferals", handleGetRequest(filePathPeriferal));

function handlePostRequest(filePath) {
  return function (request, response) {
    console.log(`fetching ${filePath}`);
    //console.log(request.body);
    //FileSystem.response.json(request.body); // sending it back to prove we got it
    const newData = request.body;
    //read file
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error && error.code !== "ENOENT") {
        // error code for missing file
        console.error("Cannot read file", error);
        return response.status(500).json({ message: "Cannot read file" });
      }
      let existingData = [];
      if (data) {
        existingData = JSON.parse(data);
      }
      existingData.push(newData);

      //write back to the file
      fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (error) => {
        if (error) {
          console.error("Cannot write to file", error);
          return response.status(500).json({ message: "Cannot save to file" });
        }
        console.log("Saved to file", newData);
        response.json(newData);
      });
    });
  };
}

app.post("/pc", handlePostRequest(filePathPc));
app.post("/monitor", handlePostRequest(filePathMonitor));
app.post("/periferals", handlePostRequest(filePathPeriferal));

app.listen(8080, function () {
  console.log("App running on port 8080");
});
