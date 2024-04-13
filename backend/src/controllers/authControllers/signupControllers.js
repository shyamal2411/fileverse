import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DataSource } from "typeorm";
import { User } from "../../models/User.js";
import { AppDataSource } from "../../index.js";

export const signup = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log("****************Before****************");
    const connection = AppDataSource;
    console.log("****************Working****************");
    const userRepository = connection.getRepository(User);

    let existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const newUser = userRepository.create({
      firstName: firstName,
      email: email,
      password: password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await userRepository.save(newUser);

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(payload, "secretKey", (err, token) => {
      if (err) throw err;
      res.json({ token, email: email, id: newUser.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
