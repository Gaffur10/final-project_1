const bcrypt = require("bcryptjs");

function hashPassword(plainPassword) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);

  return hash;
}

function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
