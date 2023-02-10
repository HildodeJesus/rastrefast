const router = require("express").Router();

const orderController = require("../controller/OrderController");
const auth = require("../middlewares/auth");

router.get("/show", orderController.showOrder);
router.get("/salvos", auth, orderController.historyPage);

router.get("/delete/:id", orderController.deleteOrder);
router.post("/create", auth, orderController.createOrder);

module.exports = router;
