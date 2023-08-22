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
    cy.visit("/login");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Welcome To Voyage Control");
    cy.contains("Please Log In");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Forgot Password");
    cy.contains("Log In");
    cy.pause();
  });
  it("it should check for email and password blank", () => {
    cy.get("[id^=login_email]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=login_password]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".btn-login").click();
    cy.pause();
  });
  it("it should check for invalid email and password", () => {
    const TestEmail = emails(10);
    cy.get("[id^=login_email]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=login_email]").type(TestEmail);
    cy.get(".btn-login").click();
    cy.pause();
  });
  it("it should check for valid email and password", () => {
    cy.get("[id^=login_password]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=login_email]").type("abc@gmail.com");
    cy.get("[id^=login_password]").type("5775756");
    // cy.get(".btn-login").click();

    cy.pause();
  });

  it("it should check email, password and redirect to dashboard page", () => {
    cy.get("[id^=login_email]").type("jaimina@gmail.com");
    cy.get("[id^=login_password]").type("123456");
    cy.get(".btn-login").click();
    cy.login("admin@gmail.com", "123456");
    cy.url().should("include", "/project/choose");
    cy.pause();
  });
  it("it should check for forgot password and redirect to forgot password page", () => {
    cy.get(".forgot-link").click();
    cy.url().should("include", "/forgotpassword");
    cy.pause();
  });
});
