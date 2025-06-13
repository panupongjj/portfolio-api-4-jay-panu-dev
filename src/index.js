// Importing & instantiating express
// General module import
const express = require("express");
const { urlencoded } = require("express");
const configs = require("./configs");

// Import router that been refactored
//const catsRoute = require('./routes/catsRoute');
//const authRoute = require('./routes/authRoute');

// Instance of express for us to use
const app = express();

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
// ENDPOINT: Path of "/api/cat" & Method of POST
// app.use("/api/cats", catsRoute);
// app.use("/api/auth", authRoute);

// NOT FOUND ENDPOINT:
// app.use((req, res) => {
//   const err = new Error("404 - Resource Not Found");
//   res.status(404).json({
//     message: err.message,
//   });
// });

// Port listener
app.listen(configs.Port, () => {
  console.log(`Listening on port ${configs.Port} !!!~~`);
});
