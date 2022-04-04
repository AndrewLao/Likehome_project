import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool.js";

// login cognito
export const login = async (email, password) => {
  return await new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        resolve(data);
        //return { valid: true, message: data };
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
        //return { valid: false, message: err.message };
        reject(err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
        resolve(data);
      },
    });
  });
};

// signup cognito
export const signup = (fname, lname, email, passwd) => {
  let attributeList = [];
  attributeList.push(
    new CognitoUserAttribute({
      Name: "given_name",
      Value: fname,
    })
  );
  attributeList.push(
    new CognitoUserAttribute({
      Name: "family_name",
      Value: lname,
    })
  );
  attributeList.push(
    new CognitoUserAttribute({
      Name: "email",
      Value: email,
    })
  );
  UserPool.signUp(email, passwd, attributeList, null, (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(data);
    }
  });
};

export const getSession = async () => {
  return await new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject();
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });
};

export const logout = () => {
  const user = UserPool.getCurrentUser();
  if (user) {
    console.log("Logging out");
    user.signOut();
  }
};
