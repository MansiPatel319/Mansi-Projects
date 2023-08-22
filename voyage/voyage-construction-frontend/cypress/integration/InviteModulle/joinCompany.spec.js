describe("choose company screen test", () => {
  const password = Cypress.env("user_password");
  const companyPageUrl = Cypress.env("choose_company_url");
  const nojoincompanyUrl = Cypress.env("nojoin_comoany_url");
  const signupPageUrl = Cypress.env("signup_url");
  beforeEach(() => {
    cy.visit(signupPageUrl);
  });
  it("it should get list of company and click on no join with that company and redirect to nojoin company ", async () => {
    cy.get("[id^=Signup_password]").type(password);
    cy.get(".btn-Signup").click();
    cy.visit(companyPageUrl);
    cy.url().should("include", companyPageUrl);
    cy.get("[id^=nojoincom]").click();
    cy.url().should("include", nojoincompanyUrl);
    cy.pause();
  });

  it("it should get list of company and click on company and redirect to set profile", async () => {
    cy.get("[id^=Signup_password]").type(password);
    cy.get(".btn-Signup").click();
    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", "userdetail");
    cy.visit(companyPageUrl);
    cy.pause();
  });
});
