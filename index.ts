import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv' ;
const usersRoutes = require("./routes/users.ts");
const app = express();

  const SERVER_PORT = process.env.SERVER_PORT || 3000;

// app use
app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.get("/", (req:Request, res:Response) => res.send("GET request to the homepage"));

app.listen(SERVER_PORT, () => {
  console.log(`server is running on port:http://localhost:${SERVER_PORT}`);
});
