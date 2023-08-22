describe("user management screen test", () => {
  const email = Cypress.env('user_email')
  const base_url = Cypress.env('base_url')
  const project_ref = Cypress.env('project_ref')
  const invite_url = Cypress.env('invite_url')
  beforeEach(() => {
    cy.visit('/:project/dashboard/manage-user')
  })
  it("it should check for email and role blank", () => {
    cy.get(".invite-btn").click();
    cy.get(".invite-model-btn").click();
    cy.pause();
  });
  it("it should check for valid email", () => {
    cy.get(".invite-btn").click();
    cy.get("[id^=email]").type("test");
    cy.get(".invite-model-btn").click();
    cy.pause();
  });
  it("it should get a list of project roles and set it into the select dropdown", async () => {
    cy.get(".invite-btn").click();
    // cy.visit(loginPageUrl)

    cy.get("[id^=email]").type(email);
    const url = `${base_url}/api/v1/${invite_url}?project=${project_ref}`
    cy.chooseReactSelectOption('#userRole', 'Super Admin', 'SuperAdmin');
    cy.fixture('data/organization.json').then((data) => {
      // load data from logo.png
      cy.intercept("POST", url,data)
    })

    cy.get(".invite-model-btn").click();
    
    cy.pause();
  
  });

});