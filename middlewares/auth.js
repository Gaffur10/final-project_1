const { generateToken, verifyToken } = require("../helpers/jwt");
const db = require("../config/config");

const authentication = async (req, res, next) => {
  try {
    // Check the header for the presence of a token
    const token = req.header("authorization");

    if (!token) {
      throw {
        code: 401,
        message: "Token not provided!",
      };
    }

    // verify token
    const decode = verifyToken(token);

    const userData = await db.query(
      `SELECT * FROM public."Users" WHERE id = $1 AND email = $2`,
      [decode.id, decode.email]
    );

    if (!userData.rows[0]) {
      throw {
        code: 401,
        message: "User not found!",
      };
    }

    req.userData = {
      id: userData.rows[0].id,
      email: userData.rows[0].email,
    };

    next();
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = { authentication };
