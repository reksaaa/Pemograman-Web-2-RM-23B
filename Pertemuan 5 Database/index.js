import express from "express";

import userController from "./controllers/user.controller.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/users", userController.getAllUsers);
app.post("/users", userController.createUser);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUserById);
app.delete("/users/:id", userController.deleteUserById);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
