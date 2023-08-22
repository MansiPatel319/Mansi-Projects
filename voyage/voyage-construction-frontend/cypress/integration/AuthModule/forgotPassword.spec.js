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
    cy.visit("/password/forgot");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Forgot Password");
    cy.contains(
      "Please enter your email and we will send you instructions to reset your password"
    );
    cy.contains("Email");
    cy.contains("Back to login");
    cy.contains("Submit");
    cy.pause();
  });
  it("it should check for email blank", () => {
    cy.get("[id^=forgot_email]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".btn-forgot-password").click();
    cy.pause();
  });
  it("it should check for invalid email ", () => {
    const TestEmail = emails(10);
    cy.get("[id^=forgot_email]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=forgot_email]").type(TestEmail);
    cy.get(".btn-forgot-password").click();
    cy.pause();
  });
  it("it should check for valid email ", () => {
    cy.get("[id^=forgot_email]").type("abc@gmail.com");
    // cy.get(".btn-forgot-password").click();
    cy.pause();
  });
  it("it should add wrong email and not redirect to login page", () => {
    cy.get("[id^=forgot_email]").type("jaimina@gmail.com");
    cy.get(".btn-forgot-password").click();
    cy.forgotPassword();
    cy.pause();
  });
  it("it should check email redirect to login page", () => {
    cy.get("[id^=forgot_email]").type("jaimina@gmail.com");
    cy.get(".btn-forgot-password").click();
    cy.forgotPassword();
    cy.pause();
  });
  it("it should check for forgot password and redirect to login page", () => {
    cy.get("[id^=back-to-login-link]").click();
    cy.url().should("include", "/login");
    cy.pause();
  });
});
