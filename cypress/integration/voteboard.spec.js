describe("VoteBoard", () => {
  //   beforeEach(() => cy.visit("/"));
  it("should render card and allow submit", () => {
    cy.visit("/");

    // should initially render options
    cy.waitAndGet({
      atrributeName: "data-testid",
      atrributeValue: "voteboard-options",
      elementType: "div",
      options: {
        timeout: 10000,
      },
    }).should("be.visible");

    cy.getDomNode({
      atrributeName: "data-testid",
      atrributeValue: "vote-radio-button-0",
      elementType: "div",
    })
      .should("be.visible")
      .click();

    cy.getDomNode({
      atrributeName: "data-testid",
      atrributeValue: "voteboard-submit",
      elementType: "button",
    })
      .should("be.visible")
      .click();

    cy.waitAndGet({
      atrributeName: "data-testid",
      atrributeValue: "voteboard-spin",
      elementType: "div",
    }).should("be.visible");
  });
});
