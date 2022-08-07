const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Define Main App
const app = express();

app.use(cors());

//import database
const database = require("./config");

//Test DB Connection
database.connect((error) => {
  if (error) {
    console.log("ERROR :", error);
  }
  console.log(`Database is connected, threadID: ${database.threadId}`);
});

//Config Middleware
app.use(express.json());

//Define Main Route
app.get("/", (req, res) =>
  res.status(200).send("<h1>Welcome to Impact Pratama Rest API!</h1>")
);

//Setup Routes
const routers = require("./routers");
app.use("/api", routers.productRouter);

// Binding to local port

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`API is running at port: ${PORT}`));
