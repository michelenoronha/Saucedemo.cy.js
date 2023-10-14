/// <reference types="Cypress"/>
describe("realizando a compra de produtos com sucesso", () => {
  it.only("Fluxo da compra de produtos", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get(".title").should("contain", "Products");

    //ordenação de produtos de menor para o maior valor

    cy.get('[data-test="product_sort_container"]').select(
      "Price (low to high)"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').should.click();
    cy.get(":nth-child(2) > .inventory_item_description")
      .should("contain", "Sauce Labs Bike Light")
      .click();
    cy.get(":nth-child(3) > .inventory_item_description")
      .should("contain", "Sauce Labs Bolt T-Shirt")
      .click();

    //Adicionando produtos ao carrinho
    cy.contains("Sauce labs Onesie").click();
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="back-to-products"]').click();
    cy.contains("Sauce Labs Bike light ").click();

    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="back-to-products"]').click();
    cy.contains("Sauce Bolt T-Shirt ").click();

    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    //checagem da quantidade de produtos adicionados ao carrinho
    cy.get(".shopping_cart_link").click();
    cy.get(".shoping_cart_link").should("have.text", "3");
    cy.get(".shopping-cart_link").click();
    cy.get(".cart_list > :nth-child(3)").should("contain", "Sauce labs Onesie");
    cy.get(".cart_list > :nth-child(4)").should(
      "contain",
      "Sauce labs Bike Light"
    );
    cy.get(".cart_list > :nth-child(5)").should(
      "contain",
      "Sauce labs Bolt T-shirt"
    );
    ///Checkout

    cy.get('[data-test="firstName"]').type("Teste primeiro nome");
    cy.get('[data-test="lastName"]').type("Teste ultimo nome");
    cy.get('[data-test="postalCode"]').type("65565487");
    cy.get('[data-test="continue"]').click();

    //checagem no valor total
    cy.get(".summary_total_label").should("have.text", "total: $36.69");
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("have.text',Thank you for your order!");
  });
});
