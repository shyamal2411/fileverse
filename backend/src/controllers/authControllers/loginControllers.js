import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../index.js";
import { User } from "../../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const connection = AppDataSource;
    const userRepository = connection.getRepository(User);

    let existingUser = await userRepository.findOne({ where: { email } });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User doesn't exits, please sign up!" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email / password doesn't match" });
    }

    const payload = {
      user: {
        id: existingUser.id,
      },
    };

    jwt.sign(payload, "secretKey", (err, token) => {
      if (err) throw err;
      res.send({
        message: "Login successful",
        token,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
