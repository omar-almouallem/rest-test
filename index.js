"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var usersRoutes = require("./routes/users.ts");
var app = (0, express_1["default"])();
var SERVER_PORT = process.env.SERVER_PORT || 3000;
// app use
app.use(body_parser_1["default"].json());
app.use("/users", usersRoutes);
app.get("/", function (req, res) { return res.send("GET request to the homepage"); });
app.listen(SERVER_PORT, function () {
    console.log("server is running on port:http://localhost:".concat(SERVER_PORT));
});
