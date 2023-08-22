describe("setup Setup Page test", () => {
  const email = Cypress.env("user_email");
  const password = Cypress.env("user_password");
  const base_url = Cypress.env("base_url");
  beforeEach(() => {
    cy.login(email, password);
    cy.visit("/myaccount");
  });

  it("it should check For Heading and text", () => {
    cy.contains("My Details");
    cy.contains("First Name");
    cy.contains("Last Name");
    cy.contains("Last Name");
    cy.contains("Phone Number");
    cy.contains("Email");
    cy.contains("Company");
    cy.contains("Update Password");
    cy.contains("My Preferences");
    cy.contains("Language");
    cy.contains("Date Format");
    cy.contains("Time Format");
    cy.contains("My Roles");
    cy.contains("Organisation Role");
    cy.contains("Project Role");
    cy.contains("Save");
    cy.pause();
  });

  it("it should check for Company Name and Address blank", () => {
    cy.get("[id^=myaccount_firstname]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=myaccount_lastname]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=myaccount_phonenumber]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=myaccount_email]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=myaccount_company]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".save-accountdetail").click();
    cy.pause();
  });
  it("it should check for phone number is valid", () => {
    cy.get("[id^=myaccount_firstname]").type("mansi");
    cy.get("[id^=myaccount_lastname]").type("Bhatt");
    cy.get("[id^=myaccount_phonenumber]").type("fgfdgbdfgfdgbdf");
    cy.get("[id^=myaccount_phonenumber]").type("9879927148");
    cy.get("[id^=myaccount_email]").type("mansi1.citrusbu@gmail.com");
    // cy.get(".save-accountdetail").click();
    cy.pause();
  });
  it("it should check and save user detail data", () => {
    cy.get("[id^=myaccount_firstname]").type("Mansi");
    cy.get("[id^=myaccount_lastname]").type("Bhatt");
    cy.get("[id^=myaccount_phonenumber]").type("8511130298");
    cy.get("[id^=myaccount_email]").type("mansi1.citrusbu@gmail.com");
    const url = `${base_url}/api/v1/users/account/?project=PRJ0000001`;
    const data = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      },
      transformRequest: [null],
      transformResponse: [null],
      timeout: 300000,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: null,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJub25jZSI6MTY1NzYxMzYxMSwiZXhwaXJlcyI6MTY1Nzc4NjQxMSwiaGFzaGVkX2RhdGEiOiJwYmtkZjJfc2hhMjU2JDMyMDAwMCRZeVZNU3lCTjFHeDhoalZjb09Xa0ZVJHZOa3pjQWJTVjcyUmtkSHgwTUVRZWtLVzdzM2ltK2lRNDdxSjBwYVpLT3c9In0.jXcAMN_INjlFEiEE8sufqSUBvIYUsHpqAEBVnvaoGg0",
      },
      withCredentials: false,
      responseType: "json",
      method: "patch",
      url: " http://local-app.voyagecontrol.com/api/v1/users/account/?project=PRJ0000001",
      // "data": "{\"email\":\"mansi1.citrusbug@gmail.com\",\"data\":{\"first_name\":\"Mansi181998\",\"last_name\":\"Bhatt\",\"mobile\":\"85111302971\"}}"
    };
    cy.intercept("PATCH", url, data);
    // cy.intercept('/login', 'success');

    cy.pause();
  });
  it("it should check for update password link ", () => {
    cy.get(".white-btn").click();
    cy.pause();
  });
  //Update Password Test cases
  it("it should check For Heading and text", () => {
    cy.get(".white-btn").click();
    cy.contains("Update Password");
    cy.contains("Current Password");
    cy.contains("New Password");
    cy.contains("New Password Again");
    cy.contains("Cancel");
    cy.pause();
  });

  it("it should check for password and confirm password blank", () => {
    cy.get(".white-btn").click();
    cy.get("[id^=myaccount_currentpassword]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=myaccount__newpassword]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get("[id^=myaccount__confirm_password]")
      .get("[data-cy=inputField]")
      .should("not.be.empty");
    cy.get(".edit-contact-cancel").click();
    cy.pause();
  });
  it("it should check for password and confirm password is different", () => {
    cy.get(".white-btn").click();
    cy.get("[id^=myaccount_currentpassword]").type("Mansi@12345");
    cy.get("[id^=myaccount__newpassword]").type("Mansi@123456");
    cy.get("[id^=myaccount__confirm_password]").type("mansi@123");
    cy.get(".edit-contact-cancel").click();
    cy.pause();
  });
  it("it should check for password and confirm password is same", () => {
    cy.get(".white-btn").click();
    cy.get("[id^=myaccount_currentpassword]").type("Mansi@12345");
    cy.get("[id^=myaccount__newpassword]").type("Mansi@123456");
    cy.get("[id^=myaccount__confirm_password]")
      .type("Mansi@123456")
      .should("have.value", "Mansi@123456");
    // cy.get(".btn-reset-password").click();
    cy.pause();
  });
  it("it should add check password, confirm passsword and redirect to login page", () => {
    cy.get(".white-btn").click();
    cy.get("[id^=myaccount_currentpassword]").type("Mansi@12345");
    cy.get("[id^=myaccount__newpassword]").type("Mansi@123456");
    cy.get("[id^=myaccount__confirm_password]")
      .type("Mansi@123456")
      .should("have.value", "Mansi@123456");
    const url = `${base_url}/api/v1/users/password/change/`;
    const data = {
      data: {
        id: 1,
        userStatus: 1,
        email: "mansi1.citrusbug@gmail.com",
        firstName: "Mansi181998",
        lastName: "Bhatt",
        organization: null,
        mobile: "85111302971",
        organizationRole: null,
      },
      status: 200,
      statusText: "OK",
      headers: {
        "content-length": "172",
        "content-type": "application/json",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        transformRequest: [null],
        transformResponse: [null],
        timeout: 300000,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: null,
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization:
            "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ1c2VyX2lkIjoxLCJub25jZSI6MTY1NzYyMTY3OCwiZXhwaXJlcyI6MTY1Nzc5NDQ3OCwiaGFzaGVkX2RhdGEiOiJwYmtkZjJfc2hhMjU2JDMyMDAwMCRZeVZNU3lCTjFHeDhoalZjb09Xa0ZVJHZOa3pjQWJTVjcyUmtkSHgwTUVRZWtLVzdzM2ltK2lRNDdxSjBwYVpLT3c9In0.fBooKBSI3Rx_L7WDJXs_DGh14aE_f7Gdn_msfqB9IhhHvf02kYR3f4ZQKbt3yxmf",
        },
        withCredentials: false,
        responseType: "json",
        method: "post",
        url: " http://local-app.voyagecontrol.com/api/v1/users/password/change/",
        data: '{"old_password":"Mansi@12345","password":"Mansi@123","session":false}',
      },
      request: {},
    };
    cy.intercept("POST", url, data);
    cy.login(email, password);
    cy.pause();
  });
});
