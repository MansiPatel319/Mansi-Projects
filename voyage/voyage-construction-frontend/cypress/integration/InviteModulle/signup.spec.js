describe("signup screen test", () => {
  const password = Cypress.env("user_password");
  const companyPageUrl = Cypress.env("choose_company_url");

  beforeEach(() => {
    cy.visit(
      "/user/invite/?new_user=true&signature=CMlmXwSmCUyGHp3gufZ/uoerbO04S512uAqjCb1Q+JXocSPZO1X1rRH5XIPxKdv6SI/g/CfRqhMuwAOzF/9n/hQVoCygxf54I/Nw8crWuDw5WFP+PamkgNamo0qIcigKG1JVYVnP+0ZfqhzdR5d7VYa4sbV5ezrTw2mDxJJ+s0E="
    );
  });
  it("it should get list of company and click on no join with that company and redirect to nojoin company ", async () => {
    cy.get("[id^=Signup_password]").type(password);
    cy.get(".btn-Signup").click();
    cy.visit(companyPageUrl);
    cy.pause();
  });
});
