import { db } from "../config/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM users WHERE username = ?";
  
  db.query(q, [username], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // So sánh password gửi lên với hash password trong DB
    const checkPassword = await bcrypt.compare(password, data[0].password);
    if (!checkPassword) return res.status(400).json("Wrong password or username");

    // Tạo JWT token
    const token = jwt.sign({ id: data[0].id }, "sercretkey");

    // Đổi tên password thành pwd để tránh trùng biến
    const { password: pwd, ...userWithoutPassword } = data[0];

    // Gửi cookie và trả về dữ liệu user (không có password)
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000, // 1 h
    }).status(200).json(userWithoutPassword);
  });
};

export const register = (req, res) => {
  const { username, password, email, name } = req.body;
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");
    // Hash password
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, 10);
    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?, ?, ?, ?)";
    db.query(q, [username, email, hashPassword, name], (err, _) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
    httpOnly: true, 
  }).status(200).json("User has been logged out.");
};
