'use strict';

describe('Expenses app', function () {
    var page;
    beforeEach(function () {
        browser.get('/demo/ex/assignment1/');
        page = {};
    });

    it('should include H1 title', function () {
        expect(element(by.tagName('h1')).getText()).to.eventually.equal('Expenses');
    });

    it('should add/edit/delete an item from/to the table', function () {
        page.date = element(by.model('expense.date'));
        page.date.sendKeys('09/06/1988');

        page.type = element(by.cssContainingText('option', 'transportation')).click();
        page.description = element(by.model('expense.description')).sendKeys('Testing Expense');
        page.amount = element(by.model('expense.amount')).sendKeys('1000');

        page.button = element(by.id('create-button'));
        page.button.click();

        //Quantity
        var items = element.all(by.repeater('exp in expensGIT STATUes track by exp.id'));
        expect(items.count()).to.eventually.equal(1);

        //Check content
        element(by.css('.table.items')).all(by.css('tbody tr')).then(function (rows) {
            return rows[0].$$('td').then(function (cols) {
                expect(cols[0].getText()).to.eventually.equal('09/06/88');
                expect(cols[1].getText()).to.eventually.equal('transportation');
                expect(cols[2].getText()).to.eventually.equal('Testing Expense');
                expect(cols[3].getText()).to.eventually.equal('1000');
            });
        });

        //Check if fields were cleaned
        expect(page.date.getAttribute('value')).to.eventually.equal('');
        expect(page.description.getAttribute('value')).to.eventually.equal('');
        expect(page.amount.getAttribute('value')).to.eventually.equal('');

        //Edit
        var items = element.all(by.repeater('exp in expenses track by exp.id'));
        items.first().then(function () {
            page.button = element(by.css('.edit-expense'));
            page.button.click();
        });

        page.date = element(by.model('expense.date'));
        page.date.sendKeys('01/01/2015');

        page.button = element(by.id('update-button'));
        page.button.click();

        element(by.css('.table.items')).all(by.css('tbody tr')).then(function (rows) {
            return rows[0].$$('td').then(function (cols) {
                expect(cols[0].getText()).to.eventually.equal('01/01/15');
                expect(cols[1].getText()).to.eventually.equal('transportation');
                expect(cols[2].getText()).to.eventually.equal('Testing Expense');
                expect(cols[3].getText()).to.eventually.equal('1000');
            });
        });

        //Delete
        var items = element.all(by.repeater('exp in expenses track by exp.id'));
        items.first().then(function () {
            page.button = element(by.css('.delete-expense'));
            page.button.click();
        });

        expect(element.all(by.repeater('exp in expenses track by exp.id')).count()).to.eventually.equal(0);
    });

});
