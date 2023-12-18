const db = require("../config/config");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
    // user registration
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const checkEmail = await db.query(
        `SELECT (email) FROM public."Users" WHERE email = $1`,
        [email]
      );

      if (checkEmail.rows[0]) {
        throw {
          code: 400,
          message: "Email is already used!",
        };
      }

      const userdata = await db.query(
        `INSERT INTO public."Users" (email, password) VALUES ($1,$2) RETURNING id, email`,
        [email, hashPassword(password)]
      );

      res.status(201).json({
        id: userdata.rows[0].id,
        email: userdata.rows[0].email,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }
  // user login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const userdata = await db.query(
        `SELECT * FROM public."Users" WHERE email = $1`,
        [email]
      );

      if (!userdata.rows[0] || !comparePassword(password, userdata.rows[0].password)) {
        throw {
          code: 401,
          message: "Invalid email or password!",
        };
      }
      const token = generateToken({
        id: userdata.rows[0].id,
        email: userdata.rows[0].email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
