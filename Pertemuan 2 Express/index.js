import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact me</h1><p>Email : reksariansyah@gmail.com</p>");
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.get("/user/reksa", (req, res) => {
  res.sendStatus(200);
});

app.put("/user/reksa", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/reksa", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/reksa", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
