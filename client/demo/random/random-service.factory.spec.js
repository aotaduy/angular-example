describe('Service: randomService', function() {
    'use strict';
   var
        $rootScope,
        $httpBackend,
        service,
        $q,
        $timeout;

   beforeEach(module('randomDemo'));
   beforeEach(inject(function(
       _$rootScope_,
       randomService,
       _$q_,
       _$httpBackend_,
       _$timeout_) {
       service = randomService;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    describe('Happy path', function () {
        beforeEach(function () {
            $httpBackend.whenGET('/api/random/faulty').respond({value: 0.7});
            $httpBackend.whenGET('/api/random/fast').respond({value: 0.7});
            $httpBackend.whenGET('/api/random/slow').respond({value: 0.7});
            sinon.stub(Math, 'random');
            Math.random.returns(0.7);
        });
        afterEach(function () {
            Math.random.restore();
        });

        it('should getRandomNumber', function() {
            service.getRandom().then(function (response) {
                expect(response).to.equal((0.7).toFixed(3));
            });
            $httpBackend.flush();
        });
        it('should getRandomNumber', function() {
            service.getRandomDeferred().then(function (response) {
                expect(response).to.be.a.number;
            });
            $timeout.flush();
            $rootScope.$digest();
        });
        it('should getRandomNumberDeferred', function(done) {
            service.getRandomDeferred().then(function (response) {
              expect(response).to.equal((0.7).toFixed(3));
              done();
            });
            service.getRandomDeferred().then(function (response) {
              done();
            });
            $timeout.flush();
            $rootScope.$digest();
        });
        it('should calculate mean', function() {
            service.getRandom();
            service.getRandom();
            $httpBackend.flush();
            expect(service.mean()).to.equal(0.7);
        });
    });
    describe('Errors path', function () {
        beforeEach(function () {
            $httpBackend.whenGET('/api/random/faulty').respond(503, {value: 0.3});
            $httpBackend.whenGET('/api/random/fast').respond(404, {value: 0.3});
            $httpBackend.whenGET('/api/random/slow').respond(500, {value: 0.3});
            sinon.stub(Math, 'random');
            Math.random.returns(0.3);
        });

        afterEach(function () {
            Math.random.restore();
        });

        it('should getRandomNumber', function() {
            service.getRandom().catch(function (response) {
                expect(response.status).to.equal(503);
            });
            $httpBackend.flush();
        });
        it('should getRandomNumberDeferred', function() {
            service.getRandomDeferred().catch(function (response) {
                expect(response.status).to.equal(404);
            });
            $timeout.flush();
            $rootScope.$digest();
        });
    });

});
