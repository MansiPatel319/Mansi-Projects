describe("choose project screen test", () => {
  const email = Cypress.env('user_email')
  const password = Cypress.env('user_password')
  const projectPageUrl = Cypress.env('choose_project_url')
  const homePageUrl = Cypress.env('home_page_url')
  const loginPageUrl = Cypress.env('login_url')
  beforeEach(() => {
    // cy.visit(loginPageUrl)
  })

  it("it should get list of project and click on project and redirect to home page", async () => {
    cy.visit(loginPageUrl)

    cy.get("[id^=login_email]").type(email);
    cy.get("[id^=login_password]").type(password);
    cy.get(".btn-login").click();
    // console.log('Cypress.env :>> ', Cypress.env('user_email'));
    cy.login(email, password);
    cy.visit(projectPageUrl)
    const data = cy.projectList();
    cy.get("[id^=project-item-0]").click();
    cy.url().should("include", homePageUrl);
    cy.pause();
  });

});
