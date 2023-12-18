const express = require("express");
const app = express();
const routes = require("./routers");
const PORT = 6000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
