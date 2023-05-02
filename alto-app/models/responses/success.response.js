const BaseResponse = require("./base.response");

class SuccessResponse extends BaseResponse {
  constructor() {
    super();
    this.success = true;
    this.alert.type = "success";
  }
}

module.exports = SuccessResponse;
