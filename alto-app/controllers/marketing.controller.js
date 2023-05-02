const responses = require("../models/responses");
const marketingService = require("../services/marketing.service");
const apiPrefix = "/api/marketing";

module.exports = {
  sendEmailBlast: sendEmailBlast,
};

function sendEmailBlast(req, res) {
  marketingService.sendEmailBlast(req.body, (response) => {
    console.log("response: " + JSON.stringify(response));
    const responseModel = new responses.ItemsResponse();
    responseModel.items = response;
    res.status(201).location(`${apiPrefix}`).json(responseModel);
  });
}
