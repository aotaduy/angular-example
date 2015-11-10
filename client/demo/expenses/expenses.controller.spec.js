'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/demo/expenses/');
    page = {};
  });

  it('should add checkbox', function() {
    page.date = element(by.id('calendar'));
    page.button = element(by.id('add-button'));
    page.date.sendKeys('2015-11-09');
    page.select = element(by.id('etype');
    page.select.val()="Food";
    page.description = element(by.id('description'));
    page.description.sendKeys = "Sandwich";
    page.amount = element(by.id('amount'));
    page.amount.sendKeys = "20";
    page.button.click();
    var expenseList = element.all(by.repeater('expense in expenseVm.expenseList track by $index'));
    expect(todoList.count()).to.eventually.equal(1);
  });
});
