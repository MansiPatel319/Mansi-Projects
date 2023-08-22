describe("setup Setup Page test", () => {
  beforeEach(() => {
    cy.visit("/setprofile");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Set Up Your Profile");
    cy.contains("First Name");
    cy.contains("Last Name");
    cy.contains("Last Name");
    cy.contains("Phone Number");
    cy.contains("Next");
    cy.pause();
  });
  it("it should check for Company Name and Address blank", () => {
    cy.get("[id^=profileSetup_firstname]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=profileSetup_lastname]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=profileSetup_phonenumber]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".btn-profileSetup").click();
    cy.pause();
  });
  it("it should check for phone number is valid", () => {
    cy.get("[id^=profileSetup_firstname]").type("Mansi");
    cy.get("[id^=profileSetup_lastname]").type("Bhatt");
    cy.get("[id^=profileSetup_phonenumber]").type("gfsdfdshfdf");
    cy.get(".btn-profileSetup").click();
    cy.pause();
  });
  it("it should check and redirect to dashboard page", () => {
    cy.get("[id^=profileSetup_firstname]").type("Mansi");
    cy.get("[id^=profileSetup_lastname]").type("Bhatt");
    cy.get("[id^=profileSetup_phonenumber]").type("8511130298");
    cy.get(".btn-profileSetup").click();
    // cy.url().should("include", "/project/choose");
    cy.visit("/setcompany");
    cy.pause();
  });
});
