import { constants } from "../../src/Library/Constants";

Cypress.Commands.add("login", () => {
  cy.request("POST", `http://127.0.0.1:8000/api/v1/login/`, {
    email: "jaimina@gmail.com",
    password: "123456",
  }).then((response) => {
    console.log("response ----->", response);
    window.localStorage.setItem(constants.LOGIN_TOKEN, response.body.token);
  });
});
Cypress.Commands.add("forgotPassword", () => {
  cy.request("POST", `http://127.0.0.1:8000/api/v1/password/reset/`, {
    email: "jaimina@gmail.com",
  }).then((response) => {
    console.log("response ----->", response);
  });
});
Cypress.Commands.add("resetPassword", () => {
  cy.request("POST", `http://127.0.0.1:8000/api/v1/password/forgot/reset/`, {
    token: "dgdfhdfhtfuy45754757547858",
    uid: 12,
    password: "Abcd@123",
  }).then((response) => {
    console.log("response ----->", response);
  });
});
