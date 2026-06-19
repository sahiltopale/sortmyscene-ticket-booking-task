import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,

      email,

      password: hashed,
    });

    res.status(201).json({
      message: "Registered",

      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const valid = await bcrypt.compare(
      password,

      user.password,
    );

    if (!valid) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,

      user: {
        id: user._id,

        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
