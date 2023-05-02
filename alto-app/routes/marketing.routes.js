const router = require("express").Router();
const marketingController = require("../controllers/marketing.controller");

module.exports = router;

router.post("/", marketingController.sendEmailBlast);
