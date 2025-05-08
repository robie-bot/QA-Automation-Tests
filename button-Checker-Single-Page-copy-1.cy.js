const path = 'cypress/fixtures/checked-links.json';

describe('Check all anchor links on the page with caching', () => {
  let checkedLinks = [];

  before(() => {
    // Load already checked links before test starts
    cy.readFile(path).then((links) => {
      checkedLinks = links || [];
    });
  });

  beforeEach(() => {
    cy.visit('https://my-iict-draft-site.zzj5dq.ap-southeast-2.wpstaqhosting.com/search-training-providers');
  });

  it('should validate all <a> tags', () => {
    const ignoreLinks = [
      "https://www.raindropaustralia.com/",
      "http://www.abundanthealingwisdom.com/",
      "https://andrewlow.coach/",
      "http://www.abmma.com.au/",
      "http://www.academyofevolutionaryastrology.com.au/",
      "http://brisbanenlp.com.au/",
      "http://bodylovehq.com/",
      "http://belindagrace.com/",
      "https://caahmkinesiology.com/",
      "https://coha.co.nz/",
      "https://selfintelligence.com/",
      "http://evelynolivares.com.au/coach/",
      "http://evelynolivares.com.au/coach/",
      "http://www.tklhealthdd.com.au/",
      "https://www.consciousgateways.net/",
      "http://kdmassagecourses.com.au/",
      "http://www.chihealing.com.au/",
      "http://www.pathofcalm.com/",
      "http://www.canberrareikiclinic.com/",
      "https://www.dynamicsleepconnection.com.au/",
      "http://www.divinesoulclinic.com/",
      "https://www.leonieblackwell.com/",
      "https://www.fitlink.co.nz/",
      "http://www.reikiforhorses.com.au/",
      "https://www.healingartofthai.com/",
      "http://www.kaleidoscopehealingbarossa.com/",
      "https://www.danielagodfrey.com/",
      "https://au.hypnobirthing.com/",
      "http://www.drkennan.com/",
      "https://holistichorseworks.com/",
      "https://heartenergetix.com/",
      "http://www.hartlifecoaching.com.au/",
      "http://www.thacollege.edu.au/",
      "http://www.iriscolour.co.uk/",
      "http://www.ihcnm.com/",
      "http://www.integralyoga.com.au/index.htm",
      "http://www.arym.org/",
      "http://www.joya-australia.com.au/",
      "http://www.kamawellnessperth.com/",
      "https://www.libervita.com.au/",
      "https://www.asiyasanctuary.com.au/",
      "http://www.mommagreen.com/",
      "http://www.maranta.com.au/",
      "http://mimt.com.au/info/",
      "http://www.marniesharmonyme.com.au/",
      "http://www.mastersinternationalinstitute.org/",
      "http://www.braingymwa.com.au/",
      "http://www.ns-health.com.au/",
      "https://nalubreathwork.com/",
      "http://www.healing-centre.com.au/",
      "http://www.pathoflove.net/",
      "https://annemariemcglasson.com/",
      "http://www.symmetryaustralia.com/",
      "http://www.devashishakti.com/",
      "https://spiritinsight.com.au/",
      "https://www.soulhaven.com.au/",
      "http://www.soulintentions.com.au/",
      "http://soulstarconnections.com.au/",
      "https://www.aswagii.com/",
      "http://scabeautyacademy.com.au/",
      "https://schoolofcolonhydrotherapy.com/",
      "https://www.rachaeltewano.com/",
      "http://www.thrivecraft.com/",
      "http://www.soulwomantribe.com/",
      "https://thaiyogamassagebydani.com.au/",
      "http://www.thetacounselling.com.au/",
      "http://www.tftau.com/",
      "http://www.soulmateconnection.com.au/",
      "http://thehealingcentre.com.au/",
      "http://www.accelerationfornaturaltherapists.com/",
      "http://www.whitetara.com.au/",
      "http://ya-el.com.au/",
      "https://www.yogaenergy.com.au/",
      "https://yourbodyhastheanswer.com/"
    ];

    cy.get('a[href]').each(($a) => {
      const href = $a.prop('href');
      const target = $a.attr('target');
    
      if (!href.startsWith('http')) {
        cy.log(`Skipping non-http link: ${href}`);
        return;
      }
    
      if (ignoreLinks.includes(href)) {
        cy.log(`Skipping ignored link: ${href}`);
        return;
      }
    
      if (checkedLinks.includes(href)) {
        cy.log(`Already checked link, skipping: ${href}`);
        return;
      }
    
      // Highlight the link element
      cy.wrap($a).invoke('css', 'outline', '3px solid red');
    
      cy.wrap(null).then(() => {
        cy.location('origin').then((origin) => {
          const isInternal = href.startsWith(origin);
      
          if (isInternal && target === '_blank') {
            cy.log(`⚠️ Internal link opens in new tab: ${href}`);
          }
          if (!isInternal && target !== '_blank') {
            cy.log(`⚠️ External link does NOT open in new tab: ${href}`);
          }
        });
      
        // ⛑️ Catch network-level request errors like SSL failures
        Cypress.once('fail', (err) => {
          if (
            err.name === 'CypressError' &&
            err.message.includes('cy.request() failed')
          ) {
            cy.log(`❌ Network-level failure for: ${href}`);
            checkedLinks.push(href);
            cy.writeFile(path, checkedLinks);
            return false; // prevents test from failing
          }
      
          throw err; // rethrow other errors
        });
      
        cy.request({
          url: href,
          failOnStatusCode: false,
          timeout: 10000
        }).then((response) => {
          if (!response || !response.status) {
            cy.log(`❌ No response: ${href}`);
          } else if (response.status >= 400) {
            cy.log(`❌ Broken link: ${href} (Status ${response.status})`);
          } else {
            cy.log(`✅ Link OK: ${href} (Status ${response.status})`);
          }
      
          checkedLinks.push(href);
          cy.writeFile(path, checkedLinks);
        });
      });
      
    });
  });
});
