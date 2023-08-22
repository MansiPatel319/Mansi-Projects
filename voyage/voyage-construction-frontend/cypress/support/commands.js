import { constants } from "../../src/Library/Constants";
const email = Cypress.env('user_email')
const password = Cypress.env('user_password')
const base_url = Cypress.env('base_url')
const invite_url = Cypress.env('invite_url')


Cypress.Commands.add("login", () => {
  cy.request("POST", `http://local-app.voyagecontrol.com/api/auth/jwt/token/`, {
    email: email,
    password: password,
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
  });
});
// Cypress.Commands.add("signup", () => {
//   cy.request("POST", `http://local-app.voyagecontrol.com/api/v1/users/signup/`, {
//     email: "mansi@yopmail.com",
//     password: "Mansi@123",
//     data:{
//       firstname:"Mansi",
//       lastname:"Bhatt",
//       mobile:"8511130298"
//     }
//   }).then((response) => {
//     window.localStorage.setItem(constants.LOGIN_TOKEN, response.body.token);
//   });
// });
Cypress.Commands.add("forgotPassword", () => {
  cy.request("POST", `http://127.0.0.1:8000/api/v1/password/reset/`, {
    email: email,
  }).then((response) => {
  });
});
Cypress.Commands.add("resetPassword", () => {
  cy.request("POST", `http://127.0.0.1:8000/api/v1/password/forgot/reset/`, {
    token: "dgdfhdfhtfuy45754757547858",
    uid: 12,
    password: "Abcd@123",
  }).then((response) => {
  });
});
Cypress.Commands.add("projectList", () => {
  const token = localStorage.getItem("token");
  const authorization = `JWT ${token}`;
  const options = {
    method: 'GET',
    url: `${base_url}/api/v1/projects/`,
    headers: {
      authorization,
    }
  };
  cy.request(options)
  .its('status')
  .should('eq', 200);
  
});
Cypress.Commands.add("chooseReactSelectOption", (selector, text, option) => {

  cy
    .get(`${selector} input`)
    .first()
    .click({ force: true })
    // .select([{ label: 'Tutorialspoint',value:'Tutorialspoint' }])
    .type(text, { force: true })
    .get(`${selector} .form-control-language__menu`)
    .contains(option)
   

    
});
