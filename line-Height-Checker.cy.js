describe('Check <li> inside <ol> has 1.8em font size', () => {
  const urls = [
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/celebrating-partnerships-in-victoria-may-2023/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/the-significance-of-collaboration-and-communication-in-building-services-engineering/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/fire-safety-engineering-designing-buildings-and-structures-that-are-safe-from-fire-hazards/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/the-role-of-building-services-engineering-in-smart-buildings/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/building-for-the-future-5-considerations-for-sustainable-engineering/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/building-services-engineering-trends-shaping-the-future-of-buildings/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/the-critical-importance-of-fire-safety-engineering-in-high-rise-buildings/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/choosing-the-right-engineering-consulting-firm-for-your-project-a-comprehensive-guide/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/significant-changes-benefits-in-the-newly-renovated-tweed-heads-library/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/giving-impact-through-a-project-with-future-fitouts/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/advantages-and-disadvantages-of-motion-sensored-lighting-systems/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/why-use-walkerbai-for-fire-safety-engineering/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/9-significant-benefits-of-bim-building-information-modelling/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/what-do-you-need-to-prepare-before-taking-the-nabers-assessment/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/6-key-things-to-look-for-in-a-nabers-assessor/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/how-to-determine-if-you-need-a-building-energy-efficiency-certificate/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-consulting-celebrates-3rd-year-anniversary/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-welcomes-new-fire-engineering-team-members/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/how-do-you-maintain-your-smoke-detectors-greenhouse-gas-emissions/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/greenhouse-gas-emissions/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/accent-lighting/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-consulting-and-tweed-shire-councils-successful-project/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/never-lose-another-building-document/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/nabers-improvement-roadmap/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/nabers-monthly-monitoring-report/',
    'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-appointed-to-local-buy-panel/'
  ];

  urls.forEach((url) => {
    it(`Checks <li> inside <ol> has font size 1.8em on ${url}`, () => {
      cy.visit(url);
      cy.get('body').then(($body) => {
        if ($body.find('ol > li').length) {
          cy.get('ol > li').each(($el) => {
            cy.wrap($el).should('have.css', 'font-size', '1.8em');
          });
        } else {
          cy.log('No <ol> found on this page');
        }
      });
    });
  });
});