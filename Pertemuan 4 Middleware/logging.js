import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log("Request URL: ", req.url);
  console.log("Request Method: ", req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
