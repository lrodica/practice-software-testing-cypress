import { performSearch, verifySearchResultsContain } from './search.helpers';

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the matching product when searching by full product name', () => {
    const searchQuery = 'Slip Joint Pliers';

    performSearch(searchQuery);
    verifySearchResultsContain(searchQuery);
  });

  it('should display all matching products when searching by partial product name', () => {
    const searchQuery = 'Pliers';

    performSearch(searchQuery);
    verifySearchResultsContain(searchQuery);
  });

  it('should display all matching products when searching by product name by pressing Enter key', () => {
    const searchQuery = 'Pliers';

    performSearch(searchQuery, 'enter');
    verifySearchResultsContain(searchQuery);
  });

  it('should display matching products regardless of letter case', () => {
    const searchQuery = 'PLIERS';

    performSearch(searchQuery);
    verifySearchResultsContain(searchQuery);
  });

  it('should display no results when searching for a non-existing product', () => {
    const searchQuery = 'NonExistingProduct';

    performSearch(searchQuery);

    cy.get('[data-test="product-name"]').should('have.length', 0);
    cy.contains(
      '[data-test="no-results"]',
      'There are no products found.',
    ).should('be.visible');
  });
});
