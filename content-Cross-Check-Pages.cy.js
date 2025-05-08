describe('Compare Multiple Pages Between Production and Staging', () => {
  const pages = [
    {
      prod: 'https://www.walkerbai.com/why-use-walkerbai-for-fire-safety-engineering/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/why-use-walkerbai-for-fire-safety-engineering/',
    },
    {
      prod: 'https://www.walkerbai.com/9-significant-benefits-of-bim-building-information-modelling/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/9-significant-benefits-of-bim-building-information-modelling/',
    },
    {
      prod: 'https://www.walkerbai.com/what-do-you-need-to-prepare-before-taking-the-nabers-assessment/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/what-do-you-need-to-prepare-before-taking-the-nabers-assessment/',
    },
    {
      prod: 'https://www.walkerbai.com/6-key-things-to-look-for-in-a-nabers-assessor/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/6-key-things-to-look-for-in-a-nabers-assessor/',
    },
    {
      prod: 'https://www.walkerbai.com/how-to-determine-if-you-need-a-building-energy-efficiency-certificate/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/how-to-determine-if-you-need-a-building-energy-efficiency-certificate/',
    },
    {
      prod: 'https://www.walkerbai.com/walkerbai-consulting-celebrates-3rd-year-anniversary/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-consulting-celebrates-3rd-year-anniversary/',
    },
    {
      prod: 'https://www.walkerbai.com/walkerbai-welcomes-new-fire-engineering-team-members/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-welcomes-new-fire-engineering-team-members/',
    },
    {
      prod: 'https://www.walkerbai.com/how-do-you-maintain-your-smoke-detectors-greenhouse-gas-emissions/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/how-do-you-maintain-your-smoke-detectors-greenhouse-gas-emissions/',
    },
    {
      prod: 'https://www.walkerbai.com/greenhouse-gas-emissions/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/greenhouse-gas-emissions/',
    },
    {
      prod: 'https://www.walkerbai.com/accent-lighting/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/accent-lighting/',
    },
    {
      prod: 'https://www.walkerbai.com/walkerbai-consulting-and-tweed-shire-councils-successful-project/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/walkerbai-consulting-and-tweed-shire-councils-successful-project/',
    },
    {
      prod: 'https://www.walkerbai.com/never-lose-another-building-document/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/never-lose-another-building-document/',
    },
    {
      prod: 'https://www.walkerbai.com/nabers-improvement-roadmap/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/nabers-improvement-roadmap/',
    },
    {
      prod: 'https://www.walkerbai.com/nabers-monthly-monitoring-report/',
      staging: 'https://walkerbai_refresh-staging.nyg1r0.ap-southeast-2.wpstaqhosting.com/nabers-monthly-monitoring-report/',
    }
  ];

  pages.forEach(({ prod, staging }) => {
    it(`Compare content between: ${prod} and ${staging}`, () => {
      let content1 = ''; // Store text from production
      let content2 = ''; // Store text from staging

      // Visit Production Page & Extract Content
      cy.visit(prod);
      cy.on("uncaught:exception", () => false); // Ignore JS errors

      cy.get('.w-post-elm.post_content.without_sections .wpb_wrapper')
        .invoke('text')
        .then((text) => {
          content1 = text.replace(/\s+/g, ' ').trim(); // Normalize whitespace
        });

      // Visit Staging Page inside cy.origin() & Extract Content
      cy.origin(staging, () => {
        cy.visit('/');
        cy.on("uncaught:exception", () => false); // Ignore JS errors

        cy.get('.et_pb_module.et_pb_text.et_pb_text_0 .et_pb_text_inner')
          .invoke('text')
          .then((text) => {
            return text.replace(/\s+/g, ' ').trim(); // Normalize whitespace
          });
      }).then((text2) => {
        content2 = text2;
        expect(content1).to.equal(content2, `Content mismatch for: ${prod}`);
      });
    });
  });
});
