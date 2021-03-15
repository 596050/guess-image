// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-wait-until";

const getDomNode = ({
  atrributeValue,
  atrributeName = "name",
  elementType = "input",
  options,
}) => cy.get(`${elementType}[${atrributeName}="${atrributeValue}"]`, options);

const waitAndGet = ({ atrributeValue, atrributeName, elementType, options }) =>
  cy.waitUntil(
    () =>
      Cypress.$(
        getDomNode({
          atrributeValue,
          atrributeName,
          elementType,
          options,
        })
      ).length > 0
  );

Cypress.Commands.add("getDomNode", getDomNode);

Cypress.Commands.add("waitAndGet", waitAndGet);
