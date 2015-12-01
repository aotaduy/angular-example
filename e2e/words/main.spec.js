'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    this.timeout(7000);
    browser.get('/demo/words/');
    page = {};
  });

  it('should count words and chars', function() {

    page.text = element(by.id('input'));
    page.text.sendKeys('write first protractor test');
    expect(element(by.id('chars')).getText()).to.eventually.equal('27');
  });
});
