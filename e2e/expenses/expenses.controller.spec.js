'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/demo/expenses/');
    page = {};
  });

  it('should add an expense', function() {
    element(by.model('expenseVm.expenseDate')).sendKeys('2015-11-10');
    element(by.model('expenseVm.expenseType')).sendKeys('Food');
    element(by.model('expenseVm.expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseVm.expenseAmount')).sendKeys('50');
    page.button = element(by.id('add-button'));
    page.button.click();
    var expenseList = element.all(by.repeater('expense in expenseVm.expenseList'));
    expect(expenseList.count()).to.eventually.equal(1);
  });

  it('should make a total amount of 20', function() {
    element(by.model('expenseVm.expenseDate')).sendKeys('2015-11-10');
    element(by.model('expenseVm.expenseType')).sendKeys('Food');
    element(by.model('expenseVm.expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseVm.expenseAmount')).sendKeys('20');
    page.button = element(by.id('add-button'));
    page.button.click();
    var amount = element(by.id('expensestotal'))
    expect(amount.getText()).to.eventually.equal('$ 20');
}); 

});
