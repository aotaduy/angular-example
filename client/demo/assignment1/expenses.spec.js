'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    this.timeout(7000);
    browser.get('/demo/assignment1/');
    page = {};
  });

  
 it('should add an expense', function() {
    element(by.model('expenseDate')).sendKeys('2015-12-01');
    element(by.model('expenseType')).sendKeys('Food');
    element(by.model('expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseAmount')).sendKeys('50');
    page.button = element(by.id('add-button'));
    page.button.click();
    var expenseList = element.all(by.repeater('expense in expenseList'));
    expect(expenseList.count()).to.eventually.equal(1);
  });

  it('should make a total amount of 20', function() {
    element(by.model('expenseDate')).sendKeys('2015-12-01');
    element(by.model('expenseType')).sendKeys('Food');
    element(by.model('expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseAmount')).sendKeys('20');
    page.button = element(by.id('add-button'));
    page.button.click();
    var amount = element(by.id('expensestotal'))
    expect(amount.getText()).to.eventually.equal('$ 20');
}); 

  it('should add and then remove an expense', function() {
    element(by.model('expenseDate')).sendKeys('2015-12-01');
    element(by.model('expenseType')).sendKeys('Food');
    element(by.model('expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseAmount')).sendKeys('50');
    page.button = element(by.id('add-button'));
    page.button.click();
    var expenseList = element.all(by.repeater('expense in expenseList'));
    page.button = element(by.id('remove-button'));
    page.button.click();
    expect(expenseList.count()).to.eventually.equal(0);
  });

});
