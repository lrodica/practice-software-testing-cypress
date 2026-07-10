/**
 * Performs a product search.
 *
 * @param searchQuery - The product name or keyword to search for.
 * @param trigger - The action used to trigger the search.
 */
export function performSearch(
  searchQuery: string,
  trigger: 'button' | 'enter' = 'button',
): void {
  cy.get('[data-test="search-query"]').type(searchQuery);
  cy.intercept({ url: '**/products/search' }).as('search');
  if (trigger === 'enter') {
    cy.get('[data-test="search-query"]').type('{enter}');
  } else {
    cy.get('[data-test="search-submit"]').click();
  }

  cy.wait('@search').then((interception) => {
    expect(interception.response?.statusCode).to.equal(200);
  });
}

/**
 * Verifies that every displayed product contains the search query.
 *
 * @param searchQuery - The expected text contained in each product name.
 */
export function verifySearchResultsContain(searchQuery: string): void {
  cy.get('[data-test="product-name"]')
    .should('have.length.at.least', 1)
    .each(($el) => {
      expect($el.text().toLowerCase()).to.contain(searchQuery.toLowerCase());
    });
}
