import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Reksa" },
  { id: 2, name: "Ahmad" },
  { id: 3, name: "Santy" },
];

app.get("/users", (req, res) => {
  res.json({
    status: 200,
    message: "Berhasil mengambil data",
    data: users,
  });
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User tidak ditemukan",
    });
  }

  res.json({
    status: 200,
    message: "Berhasil mengambil data",
    data: user,
  });
});

app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 400,
      message: "Nama harus diisi",
    });
  }
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
  };

  users.push(newUser);

  res.status(201).json({
    status: 201,
    message: "Data berhasil ditambahkan!",
    data: newUser,
  });
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User tidak ditemukan",
    });
  }

  if (!req.body.name) {
    return res.status(400).json({
      status: 400,
      message: "Nama harus diisi",
    });
  }

  user.name = req.body.name;

  res.json({
    status: 200,
    message: "Data berhasil diupdate!",
    data: user,
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User tidak ditemukan",
    });
  }

  users = users.filter((u) => u.id !== userId);

  res.json({
    status: 200,
    message: "Data berhasil dihapus!",
    data: user,
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
