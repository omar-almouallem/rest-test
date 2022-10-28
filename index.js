const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users.js");
const PORT = 3000; // env variable 
// app use
app.use(bodyParser.json());
app.use("/users", usersRoutes);

app.get("/", (req, res) => res.send("GET request to the homepage"));

app.listen(PORT, () => {
  console.log(`server is running on port:http://localhost:${PORT}`);
});
