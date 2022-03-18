const router = require("express").Router();
const marketingController = require("../controllers/subscribe.controller");

module.exports = router;

router.post("/", marketingController.create);
