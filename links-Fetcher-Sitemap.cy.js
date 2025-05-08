describe('Sitemap Link Checker', () => {
  it('Fetches links from the sitemap and validates them', () => {
    cy.request('https://royalmedical.com.au/wp-sitemap-posts-product-1.xml').then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.body, 'text/xml');
      const locElements = xmlDoc.getElementsByTagName('loc');
      const urls = Array.from(locElements).map((el) => el.textContent);
      
      // Visit each URL and check if it loads correctly
      urls.forEach((url) => {
        cy.request(url).then((pageResponse) => {
          expect(pageResponse.status).to.eq(200);
        });
      });
    });
  });
});
