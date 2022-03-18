const responses = require("../models/responses");
const subscribeService = require("../services/subscribe.service");
const apiPrefix = "/api/marketing";

module.exports = {
  create: create,
};

function create(req, res) {
  marketingService.create(req.body).then((response) => {
    const responseModel = new responses.ItemsResponse();
    responseModel.items = response;
    res.status(201).location(`${apiPrefix}`).json(responseModel);
  });
}
