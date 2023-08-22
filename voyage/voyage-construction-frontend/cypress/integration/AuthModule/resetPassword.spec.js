describe("login screen test", () => {
  const emails = (val) => {
    var email = "";
    var possible = "abcd";
    for (var i = 0; i < val; i++) {
      email += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return email;
  };
  beforeEach(() => {
    cy.visit("/password/reset");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Reset Password");
    cy.contains("The password shoud have atleast 6 characters");
    cy.contains("Password");
    cy.contains("Confirm Password");
    cy.contains("Back to login");
    cy.contains("Submit");
    cy.pause();
  });
  it("it should check for password and confirm password blank", () => {
    cy.get("[id^=reset_password]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=reset_confirm_password]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".btn-reset-password").click();
    cy.pause();
  });
  it("it should check for password and confirm password is different", () => {
    cy.get("[id^=reset_password]").type("5775756");
    cy.get("[id^=reset_confirm_password]").type("gdfhdfh");
    cy.get(".btn-reset-password").click();
    cy.pause();
  });
  it("it should check for password and confirm password is same", () => {
    cy.get("[id^=reset_password]").type("Abcd@123");
    cy.get("[id^=reset_confirm_password]")
      .type("Abcd@123")
      .should("have.value", "Abcd@123");
    // cy.get(".btn-reset-password").click();
    cy.pause();
  });

  it("it should add check password, confirm passsword and redirect to login page", () => {
    cy.get("[id^=reset_password]").type("Abcd@123");
    cy.get("[id^=reset_confirm_password]")
      .type("Abcd@123")
      .should("have.value", "Abcd@123");
    cy.get(".btn-reset-password").click();
    cy.resetPassword();
    cy.pause();
  });
  it("it should check for forgot password and redirect to forgot password page", () => {
    cy.get(".forgot-link").click();
    cy.url().should("include", "/forgotpassword");
    cy.pause();
  });
});
