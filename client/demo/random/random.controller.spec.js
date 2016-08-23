describe('Controller: RandomDemo', function() {
    'use strict';
   var controller,
        scope,
        value,
        $rootScope,
        service,
        $q;
   // Refresh the $filter every time.
   beforeEach(module('randomDemo'));
   beforeEach(module(function ($provide) {
             $provide.value('randomService', {
               getRandom: function () {
                 return $q.when(0.2);
               },
               getRandomArray: function() {
                   return $q.when([0.2, 0.3]);
               }
             })
           }));
   beforeEach(inject(function(_$rootScope_, $controller, _$q_) {
       scope = _$rootScope_.$new();
       $rootScope = _$rootScope_;
       controller = $controller('RandomController',
        {$scope: scope});
        $q = _$q_

    }));

    it('should getRandom', function() {
        controller.updateNextRandom();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('0.2\n');
    });

    it('should getRandomArray', function() {
        controller.getRandomArray();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('Array: 0.2,0.3\n');
    });

});
