const responses = require("../models/responses");
const contactUsService = require("../services/contactus.service");
const apiPrefix = "/api/contactus";

const create = (req, res) => {
  contactUsService
    .create(req.body)
    .then((response) => {
      console.log({ response });
      if (response) {
        let responseModel = new responses.SuccessResponse(response);
        console.log(responseModel)
        res.status(201).json(responseModel);
      }
   
    })
    .catch((err) => {
      console.log("ERROR: " + JSON.stringify(err.message));
      res.status(500).send(new responses.ErrorResponse(err));
    });
};

module.exports = {
  create: create,
};
