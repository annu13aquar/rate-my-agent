import { inputs, results } from '../pageObjects/homePage.json' ;
import { agent1 } from '../pageObjects/agentDetails.json' ;


describe('Search by a agent name', () => {
  "use strict";

  it('should return matching agent rows in the results', () =>{

    browser.get(browser.params.URL);
    browser.ignoreSynchronization = true;

    element(by.css(inputs.autoSearch)).click().then(()=>{
      browser.wait(function() {
        return element(by.css(inputs.searchBoxID)).isPresent();
      }, 5000,'Search box not found');
      element(by.css(inputs.searchBoxID)).sendKeys(agent1.name);

      browser.wait(function() {
        return element(by.css(results.resultsetClass)).isPresent();
      }, 5000,'Results set box not found');

      expect(element.all(by.cssContainingText('.rmaAutoSearchResultSet',  'Best Match')).isPresent()).toBe(true);
      expect(element.all(by.cssContainingText('.rmaAutoSearchResultSet',  'Locations')).isPresent()).toBe(true);
      expect(element.all(by.cssContainingText('.rmaAutoSearchResultSet',  'Agents')).isPresent()).toBe(true);
      expect(element.all(by.cssContainingText('.rmaAutoSearchResultSet',  'Agencies')).isPresent()).toBe(true);

      var agentSection = element(by.cssContainingText('.rmaAutoSearchResultSet',  'Agents'));
      var bestMatchSection = element(by.cssContainingText('.rmaAutoSearchResultSet',  'Best Match'));
      expect(agentSection.getText()).toContain('Clare Adams');
      expect(bestMatchSection.getText()).toContain('Clare Adams');
    });


    it('should navigate to agent profile page and display agent details', () =>{

      element(by.cssContainingText('.rmaAutoSearchResult__details','Clare Adams')).click();

      // validate agent profile is displayed
      browser.wait(function() {
        return element(by.css('[ng-class*=rmaAgentProfile]')).isPresent();
      }, 5000,'Failed waiting for agent profile page');

      browser.wait(function() {
        return element(by.css('[class^=Details]')).isPresent();
      }, 5000,'Failed waiting for agent details on the agent profile page');

      // Validate agent name is displayed on the profile page
      expect(element(by.css('[class^=Details---name]')).getText()).toContain('Clare Adams');
      // Validate agency name is displayed on the page
      expect(element(by.css('a[class*="Details---agencyName"]')).getText()).toContain('Woodards Carnegie');
      // Validate ratings for the agent is a number
      expect(element(by.css('[class*="StarRatingShort---rating"]')).getText()).not.toBeNaN();
      // Vaidate number of reviews is displayed for the agent on the page
      expect(element(by.css('[class*="Details---reviewRating"]')).getText()).toContain('Reviews');

    })

  });

  afterAll(function(){
    browser.quit();
  });
});
