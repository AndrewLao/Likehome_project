import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_hreqhtfbt",
  ClientId: "1hbl244d02esb2apjkn4pkdjt9",
};

export default new CognitoUserPool(poolData);
