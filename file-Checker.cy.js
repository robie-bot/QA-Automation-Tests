describe('Check PDF Existence Across Pages', () => {
  beforeEach(() => {
    cy.visit('https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/');
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Fetches all menu links and checks for PDF existence', () => {
    const pdfPath = '/wp-content/uploads/2025/02/WalkerBai-Capability-Statement_Master25.pdf';
    const values = [];

    cy.get('.menu-item > a')
      .each(($el) => {
        const href = $el.attr('href');
        if (href) {
          values.push(href);
        }
      })
      .then(() => {
        cy.log('Pages to check: ' + JSON.stringify(values));

        values.forEach((page) => {
          cy.visit(page);
          cy.request(pdfPath).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
      });
  });
});
