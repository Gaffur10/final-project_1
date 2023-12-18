const router = require("express").Router();
const ReflectionController = require("../controllers/ReflectionController");

router.get("/", ReflectionController.getAll);
router.post("/", ReflectionController.create);
router.put("/:id", ReflectionController.updateById);
router.delete("/:id", ReflectionController.deleteById);

module.exports = router;
