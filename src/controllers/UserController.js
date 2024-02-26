const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { saltRounds, secret } = require("../../config");
const jsonwebtoken = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  try {
    if (!users) {
      res.status(404).send({
        message: "No users found",
        status: 404,
      });
    }

    res.status(200).send({
      message: "Users found",
      users: users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          url: `http://localhost:3000/api/user/id/${user.id}`,
        };
      }),
      url: "http://localhost:3000/api/user",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting users",
      status: 500,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user || user === null || user === undefined) {
      res.status(404).send({
        message: "User not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "User found",
        user: user,
        url: `http://localhost:3000/api/user`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting user by id",
      status: 500,
    });
  }
};

const createUser = async (req, res) => {
  const body = req.body;

  if (!body.name || !body.email || !body.password) {
    res.status(400).send({
      message: "Missing parameters",
      parameters: ["name", "email", "password"],
      status: 400,
    });
  } else {
    try {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(body.password, salt, async (err, hash) => {
          if (err) {
            res.status(500).send({
              message: "Error creating user",
              status: 500,
            });
          }

          const user = await User.create({
            name: body.name,
            email: body.email,
            password: await hash,
          });

          res.status(201).send({
            message: "User created",
            body: body,
            url: `http://localhost:3000/api/user/id/${user.id}`,
          });
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Error creating user",
        status: 500,
      });
    }
  }
};

const loginUser = async (req, res) => {
  const body = req.body;

  if (!body.email || !body.password) {
    res.status(400).send({
      message: "Missing parameters",
      parameters: ["email", "password"],
      status: 400,
    });
  } else {
    try {
      const user = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (!user) {
        res.status(404).send({
          message: "User not found",
          status: 404,
        });
      } else {
        bcrypt.compare(body.password, user.password, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Error comparing passwords",
              status: 500,
            });
          }

          if (result) {
            const token = jsonwebtoken.sign(
              {
                email: user.email,
                userId: user.id,
              },
              secret,
              {
                expiresIn: "1h",
              }
            );

            res.status(200).send({
              message: "User logged in",
              token: token,
            });
          } else {
            res.status(401).send({
              message: "Invalid password",
              status: 401,
            });
          }
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error logging in user",
        status: 500,
      });
    }
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send({
        message: "User not found",
        status: 404,
      });
    } else {
      const deleted = await user.destroy();

      res.status(200).send({
        message: "User deleted",
        user: deleted,
        url: `http://localhost:3000/api/user`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting user",
      status: 500,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUser,
};
