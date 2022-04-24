"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.getSession = exports.signup = exports.login = void 0;

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _UserPool = _interopRequireDefault(require("./UserPool.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// login cognito
var login = function login(email, password) {
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            var user = new _amazonCognitoIdentityJs.CognitoUser({
              Username: email,
              Pool: _UserPool["default"]
            });
            var authDetails = new _amazonCognitoIdentityJs.AuthenticationDetails({
              Username: email,
              Password: password
            });
            user.authenticateUser(authDetails, {
              onSuccess: function onSuccess(data) {
                console.log("onSuccess: ", data);
                resolve(data); //return { valid: true, message: data };
              },
              onFailure: function onFailure(err) {
                console.error("onFailure: ", err); //return { valid: false, message: err.message };

                reject(err);
              },
              newPasswordRequired: function newPasswordRequired(data) {
                console.log("newPasswordRequired: ", data);
                resolve(data);
              }
            });
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}; // signup cognito


exports.login = login;

var signup = function signup(fname, lname, email, passwd) {
  return regeneratorRuntime.async(function signup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            var attributeList = [];
            attributeList.push(new _amazonCognitoIdentityJs.CognitoUserAttribute({
              Name: "given_name",
              Value: fname
            }));
            attributeList.push(new _amazonCognitoIdentityJs.CognitoUserAttribute({
              Name: "family_name",
              Value: lname
            }));
            attributeList.push(new _amazonCognitoIdentityJs.CognitoUserAttribute({
              Name: "email",
              Value: email
            }));

            _UserPool["default"].signUp(email, passwd, attributeList, null, function (err, data) {
              if (err) {
                console.error(err.message);
                reject(err);
              } else {
                console.log(data);
                resolve(data);
              }
            });
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.signup = signup;

var getSession = function getSession() {
  return regeneratorRuntime.async(function getSession$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            var user = _UserPool["default"].getCurrentUser();

            if (user) {
              user.getSession(function (err, session) {
                if (err) {
                  reject();
                } else {
                  resolve(session);
                }
              });
            } else {
              reject();
            }
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getSession = getSession;

var logout = function logout() {
  var user = _UserPool["default"].getCurrentUser();

  if (user) {
    user.signOut();
  }
};

exports.logout = logout;