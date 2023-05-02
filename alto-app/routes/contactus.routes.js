const router = require("express").Router();
const contactUsController = require("../controllers/contactus.controller");

module.exports = router;

router.post("/", contactUsController.create);
