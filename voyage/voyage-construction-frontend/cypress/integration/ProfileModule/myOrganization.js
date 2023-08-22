describe("My Organization Page test", () => {
  const email = Cypress.env('user_email')
  const password = Cypress.env('user_password')
  const org_name = Cypress.env('org_name')
  const org_address1 = Cypress.env('org_address1')
  const org_address2 = Cypress.env('org_address2')
  const town = Cypress.env('town')
  const zip = Cypress.env('zip')
  const conutry = Cypress.env('conutry')
  const base_url = Cypress.env('base_url')
  const org_url = Cypress.env('org_url')
  const userlist_url = Cypress.env('userlist_url')
  const project_ref = Cypress.env('project_ref')
  beforeEach(() => {
    cy.login(email, password);
    cy.visit("/organization");
  });
 
 
  it("it should check For Heading and text", () => {
    console.log('org_name', org_name);
    cy.contains(org_name);
    cy.contains(org_address1);
    cy.contains(org_address2);
    cy.contains(town);
    cy.contains(zip);
    cy.contains(conutry);

    cy.pause();
  });
  it("it should check for Organization Details are blank", () => {
    cy.get("[id^=organizatonName]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=organizationAddress1]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=organizationAddress2]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=organizationTown]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=organizationZip]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");

    cy.get("[id^=btn-submit]").click();
    cy.pause();
  });
  it("it should Enter User Information", () => {
    cy.get("[id^=organizatonName]").type("USA");
    cy.get("[id^=organizationAddress1]").type("Shivalik");
    cy.get("[id^=organizationAddress2]").type("Satelite");
    cy.get("[id^=organizationTown]").type("Ahmedabad");
    cy.get("[id^=organizationZip]").type("380007");
    cy.get('input[type=file]').then(subject => {
      return cy.fixture('image/logo.jpg', 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          console.log('blob', blob)
          const el = subject[0]
          if (el != null) {
            const testFile = new File([blob], 'image/logo.jpg')
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
          }
          return subject
        })
    })     
    const url = `${base_url}/api/v1${org_url}/?project=${project_ref}`
    cy.fixture('data/organization.json').then((data) => {
      cy.intercept("POST", url,data)
    })    
    cy.pause();
  });
  it("it should Click on User Tab", () => {
    cy.contains('Users').click();
    cy.pause();
  })
  it("it should Get List Of User", () => {
    cy.contains('Users').click();
    const url = `${base_url}/api/v1/${userlist_url}?project=${project_ref}`
    cy.intercept("GET", url )
    cy.pause();
  })
  it("it should Get List Of User With search", () => {
    cy.contains('Users').click();
    const searchText="test"
    const url = `${base_url}/api/v1/${userlist_url}?project=${project_ref}&search=${searchText}`
    cy.intercept("GET", url )
    cy.pause();
  })
  it("it should Get List Of User With Project Filter", () => {
    cy.contains('Users').click();
    const url = `${base_url}/api/v1/${userlist_url}?project=${project_ref}&project_filter=true&search=${searchText}`
    cy.intercept("GET", url )
    cy.pause();
  })
  
});