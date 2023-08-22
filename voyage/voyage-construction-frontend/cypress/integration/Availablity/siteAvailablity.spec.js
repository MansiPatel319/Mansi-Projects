
describe("site Details test", () => {
  const email = Cypress.env("user_email");
  const password = Cypress.env("user_password");
  const base_url = Cypress.env("base_url");
  const access_point_url = Cypress.env("access_point_url");
  const time_list_url = Cypress.env("time_list_url");
  const resource_url = Cypress.env("resource_url");
  const site_availablity_url = Cypress.env("site_availablity_url");
  const resource_availablity_url = Cypress.env("resource_availablity_url");
  beforeEach(() => {
    cy.login(email, password);
    cy.visit("availablity/project001");
  });

  it("it should check For Heading and text", () => {
    cy.contains("Availability");
    cy.contains("Hours of Operation");
    cy.contains("Breaks");
    cy.contains("Site Closures");
    cy.contains("Advanced Bookings");
    cy.contains("Site Plan");
    cy.contains("Make a Booking Information");
    cy.contains("Save");
    cy.pause();
  });

  it("it should check get List site availablity Information", () => {

    const url = `${base_url}/api/v1/${site_availablity_url}?project=undefined`

    // cy.intercept(url,'data/siteAvailablity.json'
    // ).as('siteAvailablity')

    cy.intercept("GET",url,
    (req) => {
      req.on('before:response', (res) => {
        res.headers['cache-control'] = 'no-store'
      
        console.log('res', res);
      })
    }    
    ).as('siteAvailablity')
    cy.pause();
  })
  it("it should check get List Access point for adding resource", () => {

    const url = `${base_url}/api/v1/${access_point_url}?is_active=true&project=undefined`
    cy.intercept("GET",url,
    (req) => {
      req.on('before:response', (res) => {
        res.headers['cache-control'] = 'no-store'
      
        console.log('res', res);
      })
    }    
    ).as('AccesspointList')
    cy.pause();
  })
  it("it should check get List of time for adding breaks", () => {

    const url = `${base_url}/api/v1/${time_list_url}?project=undefined`
    cy.intercept("GET",url,
    (req) => {
      req.on('before:response', (res) => {
        res.headers['cache-control'] = 'no-store'
      
        console.log('res', res);
      })
    }    
    ).as('TimeList')
    cy.pause();
  })
  it("it should check if user have submit site Availablity Information", () => {

    const url = `${base_url}/api/v1/${site_availablity_url}?project=undefined`

    cy.fixture('data/siteAvailablityAdd.json').then((data) => {
      cy.intercept("POST", url, data )
    }).as('siteAvailablity')

    cy.pause();
  })

  it("it should check if add break modal open when click on add button", () => {
    cy.get('[id^=btn-add-break-site]').click();
    cy.pause();
  })
  it("it should check if add break form should not contains empty value", () => {
    cy.get('[id^=btn-add-break-site]').click();
    cy.get("[id^=breakStartTime]")
    .get("[data-cy=inputField]")
    .should("not.be.empty");
    cy.get("[id^=breakEndTime]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=resourceBreak_name]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get('.btn-add-break-site-submit').click();
    cy.pause();
  })

  it("it should check if add resource modal open when click on add button", () => {
    cy.get('[id^=btn-add-closure-site]').click();
    cy.pause();
  })
  it("it should check if add break form should not contains empty value", () => {
    cy.get('[id^=btn-add-closure-site]').click();
    cy.get("[id^=resourceBreak_startDate]")
    .get("[data-cy=inputField]")
    .should("not.be.empty");
    cy.get("[id^=resourceBreak_endDate]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=accessPoints]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get('.btn-add-closure-site-submit').click();
    cy.pause();
  })

  
  it("it should check get list of resource availablity", () => {

    cy.get('[id^=resources]').click();
    const url = `${base_url}/api/v1/${resource_availablity_url}?project=undefined`

    cy.intercept("GET",url,
    (req) => {
      req.on('before:response', (res) => {
        res.headers['cache-control'] = 'no-store'
      
        console.log('res', res);
      })
    }    
    ).as('ResourceAvailablity')
    cy.pause();
  })

  it("it should check get List Resource for adding resource", () => {
    cy.get('[id^=resources]').click();
    const url = `${base_url}/api/v1/${resource_url}?project=undefined`
    cy.intercept("GET",url,
    (req) => {
      req.on('before:response', (res) => {
        res.headers['cache-control'] = 'no-store'
      
        console.log('res', res);
      })
    }    
    ).as('ListofResource')
    cy.pause();
  })

  it("it should check if user have submit site Availablity Information", () => {
    cy.get('[id^=resources]').click();
    const url = `${base_url}/api/v1/${resource_availablity_url}?project=undefined`

    cy.fixture('data/resAvailablityAdd.json').then((data) => {
      cy.intercept("POST", url, data )
    }).as('ResourceAvailablityDataAdd')
  
    cy.pause();
  })

  it("it should check if add break modal open when click on add button", () => {
    cy.get('[id^=resources]').click();
    cy.get('[id^=btn-add-break-res]').click();
    cy.pause();
  })
  it("it should check if add break form should not contains empty value", () => {
    cy.get('[id^=resources]').click();
    cy.get('[id^=btn-add-break-res]').click();
    cy.get("[id^=startTime]")
    .get("[data-cy=inputField]")
    .should("not.be.empty");
    cy.get("[id^=endTime]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=resourceBreak_name]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get('.btn-add-break-res-submit').click();
    cy.pause();
  })

  it("it should check if add resource modal open when click on add button", () => {
    cy.get('[id^=resources]').click();
    cy.get('[id^=btn-add-closure-res]').click();
    cy.pause();
  })
  it("it should check if add break form should not contains empty value", () => {
    cy.get('[id^=resources]').click();
    cy.get('[id^=btn-add-closure-res]').click();
    cy.get("[id^=resourceBreak_startDate]")
    .get("[data-cy=inputField]")
    .should("not.be.empty");
    cy.get("[id^=resourceBreak_endDate]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=resource]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get('.btn-add-closure-res-submit').click();
    cy.pause();
  })



});

