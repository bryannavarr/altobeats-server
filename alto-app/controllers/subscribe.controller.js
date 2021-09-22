const responses = require("../models/responses");
const subscribeService = require("../services/subscribe.service");
const apiPrefix = "/api/subscribe";

module.exports = {
  create: create,
};

function create(req, res) {
  subscribeService
    .readByEmail(req.body.email)
    .then((data) => {
      if (data) {
        res.status(200).send("success");
      } else {
        subscribeService.create(req.body.email).then((id) => {
          const responseModel = new responses.ItemResponse();
          responseModel.item = id;
          res.status(201).location(`${apiPrefix}/${id}`).json(responseModel);
        });
      }
    })
    .catch((err) => {
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
