const router = require("express").Router();

const userController = require("../controller/UserController");

router.get("/login", userController.loginPage);
router.get("/cadastrar", userController.registerPage);

router.post("/loginSave", userController.login);
router.post("/registerSave", userController.register);
router.get("/delete/:id", userController.deleteUser);
router.get("/logout", userController.logout);

module.exports = router;
