'use strict';

describe('Expenses', function() {
  var page;

  beforeEach(function() {
    browser.get('/demo/expenses/');
    page = {};
  });

  it('should add an expense', function() {
    page.date = element(by.id('date'));
    page.type = element(by.id('type'));
    page.description = element(by.id('description'));
    page.amount = element(by.id('amount'));
    page.button = element(by.id('add-button'));

    page.date.sendKeys('11/25/2015');
    page.type.sendKeys('financial');
    page.description.sendKeys('credit');
    page.amount.sendKeys('21000');
    page.button.click();

    var todoList = element.all(by.repeater('expense in expensesVm.list'));
    expect(todoList.count()).to.eventually.equal(1);
    var total = $('.row.total .ng-binding').getText();
    expect(total).to.eventually.equal('21000');

  });
});
