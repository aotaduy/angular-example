
describe('Controller: todo-list', function() {
  'use strict';
  var controller,
      scope;
  // Refresh the $filter every time.
  beforeEach(module('expensesDemo'));
  beforeEach(inject(function(_$rootScope_, $controller) {
     scope = _$rootScope_.$new();
     filter = scope.get('$filter');
     controller = $controller('ExpensesController',
      {$scope: scope, $filter: filter});
      })
  );

  it('should start empty', function() {
      expect(controller.list.length).to.equal(0);
  });

  it('add item to the list', function() {
    var item1 = {date: '2015/11/16', type:'food', description:'hot dog', amount: 1.25};
    controller.add(item1);
    expect(controller.list.length).to.equal(1);
    var item2 = {date: '2015/11/24', type:'financial', description:'credit', amount: 50000};
    controller.add(item2);
    expect(controller.list.length).to.equal(2);
  });

  it('remove item', function() {
    var item = {date: '2015/11/16', type:'food', description:'hot dog', amount: 1.25};
    controller.add(item);
    expect(controller.list.length).to.equal(1);

    controller.remove(0);
    expect(controller.list.length).to.equal(0);
  });

  it('calculate total', function() {
     var item1 = {date: '2015/11/16', type:'food', description:'hot dog', amount: 1.25};
    controller.add(item1);
    expect(controller.list.length).to.equal(1);
    var item2 = {date: '2015/11/18', type:'food', description:'dinner', amount: 12.50};
    controller.add(item2);
    expect(controller.list.length).to.equal(2);
    var item3 = {date: '2015/11/24', type:'financial', description:'credit', amount: 50000};
    controller.add(item3);
    expect(controller.list.length).to.equal(3);

    var total1 = controller.total('food');
    expect(total1).to.equal(13.75);
    expect(controller.total('financial')).to.equal(50000);
    expect(controller.total()).to.equal(150013.75);
  });


});
