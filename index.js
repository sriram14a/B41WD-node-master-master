import * as dotenv from "dotenv";
import cors from "cors"
import express from "express";
import { MongoClient } from "mongodb";
import { bookRouter } from "./routes/book.js";
import bcrypt from "bcrypt";
import { usersRouter } from "./routes/user.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();
//interceptor || converting body to json
app.use(express.json());
app.use(cors())
//req - what we send to server(params, queryParams, body)
//res - what server will send us back
app.get("/", (req, res) => {
  res.send("Hello Everyone🥳🥳🎆🎆🎇🎇");
});

app.use("/book", bookRouter);

app.use("/user", usersRouter);

app.listen(PORT, () => console.log("Server started on PORT", PORT));

