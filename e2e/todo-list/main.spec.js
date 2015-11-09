'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/demo/todo-list/');
    page = {};
  });

  it('should add checkbox', function() {
    page.date = element(by.id('date'));
    page.date.sendKeys('01/01/1980');

    element(by.id('amount')).sendKeys("1");
    element(by.id('description')).sendKeys("description");

    element(by.cssContainingText('option', 'food')).click();

    page.button = element(by.id('add-button'));
    page.button.click();
    var todoList = element.all(by.repeater('item in list'));
    expect(todoList.count()).to.eventually.equal(2);
  });
});
