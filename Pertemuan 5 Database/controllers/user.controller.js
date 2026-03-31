import db from "../db.js";

const createUser = async (request, response) => {
  const { name, username, email, password_hash } = request.body;

  try {
    const results = await db.query(
      "INSERT INTO users (name, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, email, password_hash],
    );
    response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (request, response) => {
  try {
    const results = await db.query("SELECT * FROM users ORDER BY id");
    response.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const results = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!results.rows.length) {
      return response.status(404).send("User not found");
    }
    response.status(200).json(results.rows[0]);
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, username, email, password_hash } = request.body;

  try {
    const results = await db.query(
      "UPDATE users SET name = $1, username = $2, email = $3, password_hash = $4 WHERE id = $5 RETURNING *",
      [name, username, email, password_hash, id],
    );

    if (!results.rows.length) {
      return response.status(404).send("User not found");
    }
    response.status(200).send(`User modified with ID: ${id}`);
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const get = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!get.rows.length) {
      return response.status(404).send("User not found");
    }
    await db.query("DELETE FROM users WHERE id = $1", [id]);

    response.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    throw error;
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
