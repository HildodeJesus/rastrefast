const router = require("express").Router();

const homeController = require("../controller/HomeController");

router.get("/", homeController.index);
router.get("/about", homeController.about);

module.exports = router;
