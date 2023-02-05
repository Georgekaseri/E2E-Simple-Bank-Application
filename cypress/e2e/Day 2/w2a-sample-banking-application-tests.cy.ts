import 'cypress-xpath'
import { faker } from '@faker-js/faker';


describe('Banking Application Test',()=>{

    it('Create and Verify Customer Account', ()=>{
        cy.visit('https://www.way2automation.com/angularjs-protractor/banking/#/login'); 
        
        //Invoke as Manager
        cy.contains('Bank Manager Login').click()
        cy.contains('Customers').click()
        cy.wait(2000)

        // Delete all existing customers data
        cy.xpath("//button[.='Delete']").each(($el)=>{
            $el.click()
        })
      

        cy.contains('Add Customer').click()
        
        //Create dummy customer's data
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const zipCode = faker.address.zipCode();

        //Fill customer data in the form
        cy.xpath("//input[@placeholder='First Name']").type(firstName);
        cy.xpath("//input[@placeholder='Last Name']").type(lastName);
        cy.xpath("//input[@placeholder='Post Code']").type(zipCode);
        cy.xpath("//button[@type='submit']").click();

        const customerFullName = firstName+ " " +lastName;

        //Generate customer account number with currency Rupees
        cy.contains('Open Account').click();
        cy.get('#userSelect').select(customerFullName);
        cy.get('#currency').select('Rupee');
        cy.get("button[type='submit']").click();

         //Generate customer account number with currency Pound
         cy.contains('Open Account').click();
         cy.get('#userSelect').select(customerFullName);
         cy.get('#currency').select('Pound');
         cy.get("button[type='submit']").click();

          //Generate customer account number with currency Dollar
        cy.contains('Open Account').click();
        cy.get('#userSelect').select(customerFullName);
        cy.get('#currency').select('Dollar');
        cy.get("button[type='submit']").click();

        //Select Customer tab
        cy.contains('Customers').click();

        //Get Customer First Name
        cy.xpath("//table[@class='table table-bordered table-striped']/tbody/tr[1]/td[1]")
        .then($el=>{
            cy.wrap($el.text()).as ('firstNameDisplay')
        })

        // Get Customer Last Name
        cy.xpath("//table[@class='table table-bordered table-striped']/tbody/tr[1]/td[2]")
        .then($el=>{
            cy.wrap($el.text()).as('lastNameDisplay')
        })
        
         // Get Customer Post Code
         cy.xpath("//table[@class='table table-bordered table-striped']/tbody/tr[1]/td[3]")
         .then($el=>{
             cy.wrap($el.text()).as('postCodeDisplay')
         })

          // Get Customer Accounts Numbers
          cy.xpath("//table[@class='table table-bordered table-striped']/tbody/tr[1]/td[4]")
          .then($el=>{
              cy.wrap($el.text()).as('accountsDisplay')
              cy.log('Accounts Numbers are: - ' +$el.text())
          })

          // Get list of Customer Accounts
          cy.get('@accountsDisplay').then($accounts=>{
            let accountsList = $accounts.toString().split(' ')
            cy.log("First Rupees Account is : - " +accountsList[0])
            cy.log("Second Pound Account is : - " +accountsList[1])
            cy.log("Thirds Dollar Account is : - " +accountsList[2])
          })

          //Writ Code for Customer Login
          cy.get(".btn.home").click()
          cy.get("button[ng-click='customer()']").click()
          cy.get("div[class='form-group'] label").should('be.visible');
          cy.xpath("//select[@id='userSelect']").select(customerFullName)
          cy.xpath("//button[normalize-space()='Login']").click()
         // Verify Customer Name
          cy.xpath("//span[@class='fontBig ng-binding']").then($el=>{
            cy.wrap($el.text()).as ('displayName')
        })
        //Verify Welcome Text
        cy.contains("Welcome").should('be.visible')
        // Verify labels
        cy.get('.borderM > :nth-child(3)').should('be.visible')

        cy.get('.borderM > :nth-child(3)').should('be.visible')
        cy.xpath("//strong[@class='mainHeading']").should('be.visible')
        .and('have.text', 'XYZ Bank')

        // Verify Home, Logout buttons
        cy.get(".btn.home").should('be.visible').and('exist')
        cy.get(".btn.logout").should('be.visible').and('exist')
        cy.xpath("//button[normalize-space()='Transactions']").should('be.visible')
        cy.xpath("//button[normalize-space()='Withdrawl']").should('be.visible')
        cy.get('[ng-class="btnClass2"]').should('be.visible')
        
        // Deposit the Amount
        cy.get('[ng-class="btnClass2"]').click();
        cy.get("input[placeholder='amount']").type('5000')
        cy.get("button[type='submit']").click();
        cy.get("div[class='form-group'] label").should('have.text', 'Amount to be Deposited :')
        
             // Verify deposit message
        cy.get(".error.ng-binding").should('be.visible').and ('have.text', 'Deposit Successful')
        
        cy.wait(2000)

        // Withdrew Money 
        cy.xpath("//button[@ng-click='withdrawl()']").click()
        cy.wait(2000)
        cy.xpath("//input[@placeholder='amount']").clear()
        cy.xpath("//input[@placeholder='amount']").type('3000')
        cy.xpath('//button[@type="submit"]').click()
        cy.get('.error').should('have.text', 'Transaction successful')
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text',  '2000')

        // Logout
        cy.get('.logout').click()



    })
})