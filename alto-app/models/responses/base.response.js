class BaseResponse {
  constructor() {
    this.success = false;
    this.alert = {
      message: null,
      type: null
    };
  }
}

module.exports = BaseResponse;
