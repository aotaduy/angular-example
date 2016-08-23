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
   beforeEach(inject(function(_$rootScope_, $controller, randomService, _$q_) {
       scope = _$rootScope_.$new();
       $rootScope = _$rootScope_;
       controller = $controller('RandomController',
        {$scope: scope});
        service = randomService;
        $q = _$q_
    }));

    it('should getRandom', function() {
        sinon.stub(service, 'getRandom', function() {
            return $q.when(0.2);
        });
        controller.updateNextRandom();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('0.2\n');
        service.getRandom.restore();
    });

    it('should getRandom', function() {
        sinon.stub(service, 'getRandom');
        service.getRandom.onCall(0).returns($q.when(0.2));
        service.getRandom.onCall(1).returns($q.when(0.3));
        controller.updateNextRandom();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('0.2\n');
        controller.updateNextRandom();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('0.2\n0.3\n');

        service.getRandom.restore();
    });

    it('should getRandomArray', function() {
        sinon.stub(service, 'getRandomArray', function() {
            return $q.when([0.2, 0.3]);
        });
        controller.getRandomArray();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('Array: 0.2,0.3\n');
        service.getRandomArray.restore();
    });
    it('should getRandomArray', function() {
      sinon.stub(service, 'getRandomArray', function() {
          return $q.when([0.2, 0.3]);
      });

        controller.getRandomArray();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('Array: 0.2,0.3\n');
        service.getRandomArray.restore();
    });

    it('should getRandomLocal mock', function() {
      var spy = sinon.spy(),
          mock = sinon.mock(Math);
          mock.expects('random').once();
        sinon.spy(service.mean);

        $rootScope.$on('randomGenerated', spy);

        controller.updateNextRandomLocal();
        $rootScope.$digest();

        mock.verify();
        mock.restore();
    });

    it('should handleError', function() {
        sinon.stub(service, 'getRandom', function() {
            return $q.reject(
                {   status: 404,
                    data: {value: 0.2}
             });
        });
        controller.updateNextRandom();
        $rootScope.$digest();
        expect(controller.messageHistory).to.equal('Failed with: 404 0.2\n');
        service.getRandom.restore();
    });
});
