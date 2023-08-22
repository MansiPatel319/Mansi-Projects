describe("site Details test", () => {
  const email = Cypress.env("user_email");
  const password = Cypress.env("user_password");
  const base_url = Cypress.env("base_url");
  const access_point_url = Cypress.env("access_point_url");
  const project_ref = Cypress.env("project_ref");
  const resource_url = Cypress.env("resource_url");
  const site_url = Cypress.env("site_url");
  const contact_url = Cypress.env("contact_url");
  beforeEach(() => {
    cy.login(email, password);
    cy.visit("/demo-stg/site-details");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Details");
    cy.contains("Site Name");
    cy.contains("Site Address");
    cy.contains("Images & Home Screen");
    cy.contains("Logo");
    cy.contains("Home Banner");
    cy.contains("Contacts");
    cy.contains("Home Screen Message");
    cy.contains("Save");
    cy.pause();
  });

  it("it should check for filed are not empty", () => {
    cy.get("[id^=siteName]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=siteAddress]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=siteLogo]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=homeBannerImage]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".ck-editor__editable")
      // .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".btn-site-information-submit").click();
    cy.pause();
  });
  it("it should check get List site information", () => {

    const url = `${base_url}/api/v1/${site_url}?project=${project_ref}`

    cy.intercept("GET", url)

    cy.pause();
  })
  it("it should check if user have submit site information", () => {

    const url = `${base_url}/api/v1/${site_url}?project=${project_ref}`

    cy.fixture('data/sitedetail.json').then((data) => {
      console.log('data', data);
      cy.intercept("POST", url, data.data)
    })

    cy.pause();
  })
  it("it should check get List Contact information", () => {

    const url = `${base_url}/api/v1/${contact_url}?project=${project_ref}`

    cy.intercept("GET", url)

    cy.pause();
  })
  it("it should check if user have submit contact", () => {

    const url = `${base_url}/api/v1/${contact_url}?project=${project_ref}`

    cy.fixture('data/contact.json').then((data) => {
      console.log('data', data);
      cy.intercept("POST", url, data.data)
    })

    cy.pause();
  })
  it("it should check for click Accesspoint tab", () => {

    cy.get('[id^=access-point]').click();
    cy.pause();
  })
  it("it should check get List of Accesspoint", () => {
    cy.get('[id^=access-point]').click();
    const url = `${base_url}/api/v1/${access_point_url}?project=${project_ref}`

    cy.intercept("GET", url)

    cy.pause();
  })
  it("it should check if user have submit accesspoint", () => {

    cy.get('[id^=access-point]').click();
    const url = `${base_url}/api/v1/${access_point_url}?project=${project_ref}`

    cy.fixture('data/accesspoint.json').then((data) => {
      cy.intercept("POST", url, data)
    })
    cy.fixture('data/accesspoint.json').then((data) => {
      cy.intercept("PUT", url, data.data[0])
    })
    cy.pause();
  })
  it("it should check for click Resource tab", () => {

    cy.get('[id^=resources]').click();

    cy.pause();


  })
  it("it should get list of Resource ", () => {
    cy.get('[id^=resources]').click();
    const url = `${base_url}/api/v1/${resource_url}?project=${project_ref}`

    cy.intercept("GET", url)

    cy.pause();
  })
  it("it should check if user have get resource", () => {

    cy.get('[id^=resources]').click();
    const url = `${base_url}/api/v1/${resource_url}?project=${project_ref}`

    cy.fixture('data/resource.json').then((data) => {
      console.log('data', data);
      cy.intercept("POST", url, data.data[0])
    })
    cy.fixture('data/resource.json').then((data) => {
      cy.intercept("PUT", url, data.data[0])
    })
    cy.pause();
  })

});

