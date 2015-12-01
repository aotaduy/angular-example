'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    this.timeout(7000);
    browser.get('/demo/assignment2/');
    page = {};
  });

  
 it('should add an expense', function() {
    element(by.model('expenseVm.expenseType')).sendKeys('Food');
    element(by.model('expenseVm.expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseVm.expenseAmount')).sendKeys('50');
    page.button = element(by.id('add-button'));
    page.button.click();
    var expenseList = element.all(by.repeater('expense in expenseVm.expenseList'));
    expect(expenseList.count()).to.eventually.equal(1);
  });

  it('should make a total amount of 20', function() {
    element(by.model('expenseVm.expenseType')).sendKeys('Food');
    element(by.model('expenseVm.expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseVm.expenseAmount')).sendKeys('20');
    page.button = element(by.id('add-button'));
    page.button.click();
    var amount = element(by.id('expensestotal'))
    expect(amount.getText()).to.eventually.equal('$ 20');
}); 

  it('should add and then remove an expense', function() {
    element(by.model('expenseVm.expenseType')).sendKeys('Food');
    element(by.model('expenseVm.expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseVm.expenseAmount')).sendKeys('50');
    page.button = element(by.id('add-button'));
    page.button.click();
    var expenseList = element.all(by.repeater('expense in expenseVm.expenseList'));
    page.button = element(by.id('remove-button'));
    page.button.click();
    expect(expenseList.count()).to.eventually.equal(0);
  });

  it('should add an expense with amount 50, edit its amount to 20, leaving a total amount of 20', function() {
    element(by.model('expenseVm.expenseDate')).sendKeys('2015-12-01');
    element(by.model('expenseVm.expenseType')).sendKeys('Food');
    element(by.model('expenseVm.expenseDescription')).sendKeys('Sandwich');
    element(by.model('expenseVm.expenseAmount')).sendKeys('50');
    page.button = element(by.id('add-button'));
    page.button.click();
    page.button = element(by.id('edit-button'));
    page.button.click();
    element(by.model('expense.newValue')).sendKeys(protractor.Key.BACK_SPACE);
    element(by.model('expense.newValue')).sendKeys(protractor.Key.BACK_SPACE);
    element(by.model('expense.newValue')).sendKeys('20');
    var amount = element(by.id('expensestotal'))
    page.button = element(by.id('save-button'));
    page.button.click();
    expect(amount.getText()).to.eventually.equal('$ 20');
  });

});
