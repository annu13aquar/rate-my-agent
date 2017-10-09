import { inputs, results } from '../pageObjects/homePage.json' ;
import { agent1 } from '../pageObjects/agentDetails.json' ;
import { profile } from '../pageObjects/profilePage.json' ;

describe('Search by an agent name', () => {
  "use strict";

  it('should return matching data rows in the results', () =>{

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

      expect(element.all(by.cssContainingText(results.resultsetClass,  results.bestMatchText)).isPresent()).toBe(true , 'Failed waiting for section Best Match in the search results');
      expect(element.all(by.cssContainingText(results.resultsetClass,  results.locationsText)).isPresent()).toBe(true , 'Failed waiting for section Locations in the search results');
      expect(element.all(by.cssContainingText(results.resultsetClass,  results.agentsText)).isPresent()).toBe(true , 'Failed waiting for section Agents in the search results');
      expect(element.all(by.cssContainingText(results.resultsetClass,  results.agenciesText )).isPresent()).toBe(true , 'Failed waiting for section Agencies in the search results');
    });
  });

  it('validate matching agent rows are displayed in both best match and agents section', () =>{

    var agentSection = element(by.cssContainingText(results.resultsetClass,  results.agentsText));
    var bestMatchSection = element(by.cssContainingText(results.resultsetClass,  results.bestMatchText));
    expect(agentSection.getText()).toContain(agent1.name);
    expect(bestMatchSection.getText()).toContain(agent1.name);
  });

  it('validate agent row contains agent image, name, location and agency name', () =>{

    var rowContainingMyAgentName = element(by.cssContainingText('a',agent1.name));
    rowContainingMyAgentName.getText().then((rowDetails)=>{

      expect(rowDetails).toContain(agent1.name,'Failed waiting for results row to contain agent name');
      expect(rowDetails).toContain(agent1.location, 'Failed waiting for results row to contain location name');
      expect(rowDetails).toContain(agent1.agencyName, 'Failed waiting for results row to contain agency name');
      expect(rowContainingMyAgentName.element(by.css('img')).getAttribute('src')).toMatch(agent1.imageUrl , 'agent image not displayed');
      expect(rowContainingMyAgentName.element(by.css('strong')).getText()).toMatch(agent1.name,'agent name not highlighted');
    });
  });

  it('validate clicking on agent row navigates user to agent profile page and display agent details', () =>{

    element(by.cssContainingText('.rmaAutoSearchResult__details',agent1.name)).click();

    // validate agent profile is displayed
    browser.wait(function() {
      return element(by.css(profile.profileClass)).isPresent();
    }, 5000,'Failed waiting for agent profile page');

    browser.wait(function() {
      return element(by.css(profile.detailsClass)).isPresent();
    }, 5000,'Failed waiting for agent details on the agent profile page');

    // Validate agent name is displayed on the profile page
    expect(element(by.css(profile.nameClass)).getText()).toContain(agent1.name);
    // Validate agency name is displayed on the page
    expect(element(by.css(profile.agencyNameClass)).getText()).toContain(agent1.agencyName);
    // Validate ratings for the agent is a number
    expect(element(by.css(profile.ratingClass)).getText()).not.toBeNaN();
    // Vaidate number of reviews is displayed for the agent on the page
    expect(element(by.css(profile.reviewClass)).getText()).toContain('Reviews');

  })



  afterAll(function(){
    browser.quit();
  });
});
