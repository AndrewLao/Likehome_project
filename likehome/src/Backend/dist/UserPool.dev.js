"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

// user pool info
var poolData = {
  UserPoolId: "us-east-1_hreqhtfbt",
  ClientId: "1hbl244d02esb2apjkn4pkdjt9"
};

var _default = new _amazonCognitoIdentityJs.CognitoUserPool(poolData);

exports["default"] = _default;