describe('Is Favicon is available', () => {
  it('assert favicon', () => {
    cy.visit('https://kids-first.com.au/').document().its('head').find('link[rel="icon"]').should('have.attr', 'href');
    cy.wait(2500).then(cy.screenshot({ capture: 'fullPage' }));

   });
})