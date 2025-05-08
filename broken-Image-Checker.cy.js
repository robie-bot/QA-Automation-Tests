describe('Broken Image Checker (Multiple Sitemaps)', () => {
  const sitemapUrls = [
    'https://www.achieveprojects.net/our_portfolio-sitemap.xml',
    'https://www.achieveprojects.net/page-sitemap.xml'

  ];

  it('Checks for broken images on all pages from multiple sitemaps', () => {
    let brokenImages = [];

    cy.wrap(sitemapUrls).each((sitemapUrl) => {
      cy.request(sitemapUrl).then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.body, 'text/xml');
        const urls = Array.from(xmlDoc.getElementsByTagName('loc')).map(el => el.textContent);

        cy.wrap(urls).each((url) => {
          cy.visit(url, { failOnStatusCode: false });

          cy.get('img').each(($img) => {
            cy.wrap($img).then(($imgEl) => {
              if ($imgEl[0].naturalWidth === 0) {
                const brokenImageInfo = `❌ Broken image: ${$imgEl.attr('src')} on ${url}`;
                cy.log(brokenImageInfo);
                brokenImages.push(brokenImageInfo);
              }
            });
          });
        });
      });
    });

    cy.then(() => {
      if (brokenImages.length > 0) {
        cy.log(`🚨 Found ${brokenImages.length} broken images`);
        cy.log(brokenImages.join('\n'));
      }
    });
  });
});