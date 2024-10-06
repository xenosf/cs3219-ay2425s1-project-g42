import http from "http";
import index from "./index.js";
import "dotenv/config";
import { connectToDB } from "./model/repository.js";

const port = process.env.PORT || 3001;

const server = http.createServer(index);

await connectToDB().then(() => {
  console.log("User service connected to MongoDB");

  server.listen(port);
  console.log("User service is listening on port " + port);
}).catch((err) => {
  console.error("User service failed to connect to DB");
  console.error(err);
});

