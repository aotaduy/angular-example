'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/demo/todo-list-cs/');
    page = {};
  });

  it('should add item to table', function() {
    page.date = element(by.id('date'));
    page.date.sendKeys('01/01/1980');

    page.type = element(by.cssContainingText('option', 'food')).click();

    page.description = element(by.id('description'));
    page.description.sendKeys('a description');

    page.amount = element(by.id('amount'));
    page.amount.sendKeys('79014');

    page.button = element(by.id('add-button'));
    page.button.click();

    page.addButton = element(by.id('add-button'));
    expect(page.addButton.getAttribute('class')).to.eventually.not.contains('ng-hide');

    page.cancelButton = element(by.id('cancel-button'));
    expect(page.cancelButton.getAttribute('class')).to.eventually.contains('ng-hide');

    page.updateButton = element(by.id('update-button'));
    expect(page.updateButton.getAttribute('class')).to.eventually.contains('ng-hide');

    // Items in the main table (items in CRUD list)
    var itemsList = element(by.id('items-list')).all(by.css('tr'));
    expect(itemsList.count()).to.eventually.equal(1);
    
    var itemsList = element(by.id('items-list')).all(by.css('tr')).then(function(rows) {
        return rows[0].$$('td').then(function(cols) {
                expect(cols[0].getText()).to.eventually.equal('01/01/1980');
                expect(cols[1].getText()).to.eventually.equal('food');
                expect(cols[2].getText()).to.eventually.equal('a description');
                expect(cols[3].getText()).to.eventually.equal('79014');
                /* left here just as an example
                return cols[0].getText().then(function (text) {
                    console.log('text:', text);
                });
                */
                
        });
    });

    // Check totals table
    var totalsList = element(by.id('totals-list')).all(by.css('tr'));
    expect(totalsList.count()).to.eventually.equal(6); // 6 types

    var totalsList = element(by.id('totals-list')).all(by.css('tr')).then(function(rows) {
        return rows[0].$$('td').then(function(cols) {
                expect(cols[1].getText()).to.eventually.equal('NaN');
                
        });
    });

    // Check if input fields have been cleared
    var desc = element(by.id('description'))
    expect(desc.getAttribute('value')).to.eventually.equal('');

    var date = element(by.id('date'))
    expect(date.getAttribute('value')).to.eventually.equal('');

    var amount = element(by.id('amount'))
    expect(amount.getAttribute('value')).to.eventually.equal('');


    // Check edit first item
    page.button = element(by.id('edit-0'));
    page.button.click();              

    var date = element(by.id('date'))
    expect(date.getAttribute('value')).to.eventually.equal('01/01/1980');

    var desc = element(by.id('description'))
    expect(desc.getAttribute('value')).to.eventually.equal('a description');

    var amount = element(by.id('amount'))
    expect(amount.getAttribute('value')).to.eventually.equal('79014');


    // Clickig on cancel must left all items unchanged and it must clear all
    // the input fields again
    page.button = element(by.id('cancel-button'));
    page.button.click();              

    var itemsList = element(by.id('items-list')).all(by.css('tr')).then(function(rows) {
        return rows[0].$$('td').then(function(cols) {
                expect(cols[0].getText()).to.eventually.equal('01/01/1980');
                expect(cols[1].getText()).to.eventually.equal('food');
                expect(cols[2].getText()).to.eventually.equal('a description');
                expect(cols[3].getText()).to.eventually.equal('79014');
        });
    });
   
    var desc = element(by.id('description'))
    expect(desc.getAttribute('value')).to.eventually.equal('');

    var date = element(by.id('date'))
    expect(date.getAttribute('value')).to.eventually.equal('');

    var amount = element(by.id('amount'))
    expect(amount.getAttribute('value')).to.eventually.equal('');

    // Check button's states have been updated
    page.addButton = element(by.id('add-button'));
    expect(page.addButton.getAttribute('class')).to.not.eventually.contains('ng-hide');

    page.cancelButton = element(by.id('cancel-button'));
    expect(page.cancelButton.getAttribute('class')).to.eventually.contains('ng-hide');

    page.updateButton = element(by.id('update-button'));
    expect(page.updateButton.getAttribute('class')).to.eventually.contains('ng-hide');
    
    // Edit the first item and change the date
    // After updating the input fields should be cleared again
    page.button = element(by.id('edit-0'));
    page.button.click();              

    page.date = element(by.id('date'));
    page.date.clear();
    page.date.sendKeys('01/01/1981');

    page.button = element(by.id('update-button'));
    page.button.click();

    var itemsList = element(by.id('items-list')).all(by.css('tr')).then(function(rows) {
        return rows[0].$$('td').then(function(cols) {
                expect(cols[0].getText()).to.eventually.equal('01/01/1981');
                expect(cols[1].getText()).to.eventually.equal('food');
                expect(cols[2].getText()).to.eventually.equal('a description');
                expect(cols[3].getText()).to.eventually.equal('79014');
        });
    });

    var desc = element(by.id('description'))
    expect(desc.getAttribute('value')).to.eventually.equal('');

    var date = element(by.id('date'))
    expect(date.getAttribute('value')).to.eventually.equal('');

    var amount = element(by.id('amount'))
    expect(amount.getAttribute('value')).to.eventually.equal('');

    // Check button's states have been updated
    page.addButton = element(by.id('add-button'));
    expect(page.addButton.getAttribute('class')).to.eventually.not.contains('ng-hide');

    page.cancelButton = element(by.id('cancel-button'));
    expect(page.cancelButton.getAttribute('class')).to.eventually.contains('ng-hide');

    page.updateButton = element(by.id('update-button'));
    expect(page.updateButton.getAttribute('class')).to.eventually.contains('ng-hide');
    // Delete the first (and only) item.
    page.button = element(by.id('delete-0'));
    page.button.click();              

    var itemsList = element.all(by.repeater('item in list'));
    expect(itemsList.count()).to.eventually.equal(0);

  });
});
