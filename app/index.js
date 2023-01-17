// Express is a web framework for Node.js
// We primarily use it to route users to different pages/responses
import express from "express";

const app = express();

app.get("/", (_, response) => {
  response.send("<h1>zhello earth</h1>");
});

app.get("/about", (_, response) => {
  response.send("<h1>about page</h1>");
});

// Express uses middleware to parse the body of a request
// This is required to access the body of a POST request
app.use(express.json());

app.post("/api/contacts", (request, response) => {
  console.log(request.body);
  response.send("ok");
});

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
