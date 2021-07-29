const router = require("express").Router();
const subscribeController = require("../controllers/subscribe.controller");

module.exports = router;

router.post("/", subscribeController.create);
