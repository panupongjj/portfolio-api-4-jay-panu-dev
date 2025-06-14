// Importing & instantiating express
const express = require("express");
const cors = require("cors");
// General module import

const { urlencoded } = require("express");
const configs = require("./configs");

// Import router that been refactored
const projectRoute = require("./routes/projectRoute");
const userRoute = require("./routes/userRoute");

// Instance of express for us to use
const app = express();
app.use(cors());

// Connection to DB
const dbConnect = require("./utils/dbConnect");
dbConnect();

// Middleware -- > all the tools that you want to use in yours project
app.use(express.json()); // POST/PUT
app.use(urlencoded({ extended: false }));

// Routes [KEY]
// ENDPOINT: Path of "/api" & Method of GET
// app.get("/", (req, res) => {
//   res.send("Respond from Index.js pages - none Refactor ");
// });

//ENDPOINT: Path of "/api/project"
app.use("/api/project", projectRoute);
//ENDPOINT: Path of "/api/user"
app.use("/api/user", userRoute);

//NOT FOUND ENDPOINT:
app.use((req, res) => {
  const err = new Error("404 - Resource Not Found");
  res.status(404).json({
    message: err.message,
  });
});

// // Port listener
// app.listen(configs.Port, () => {
//   console.log(`Listening on port ${configs.Port} !!!~~`);
// });
