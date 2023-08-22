describe("setup Company Page test", () => {
  beforeEach(() => {
    cy.visit("/setcompany");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Set Up Your Company");
    cy.contains("Company Name");
    cy.contains("Address");
    cy.contains("Submit");
    cy.pause();
  });
  it("it should check for Company Name and Address blank", () => {
    cy.get("[id^=companySetupPage_companyname]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=companySetupPage_address]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".btn-companySetupPage").click();
    cy.pause();
  });

  it("it should check and redirect to dashboard page", () => {
    cy.get("[id^=companySetupPage_companyname]").type("Citrusbug");
    cy.get("[id^=companySetupPage_address]").type("Ahmedabad");

    cy.visit("/login");
    cy.pause();
  });
});
