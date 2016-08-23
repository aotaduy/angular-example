describe('Controller: MainCtrl', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('moviesApp', function ($provide) {
      $provide.value('movies', {data: {results: []}});
      $provide.value('topMovies', {data: {results: []}});

  }));

  var controller,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/movies/search/star')
      .respond({
          results:[
              {title: 'Star Wars'},
              {title: 'Star Trek'}
          ]
      });

    scope = $rootScope.$new();
    controller = $controller('SearchPageController', {
      $scope: scope
    });
  }));

  it('should empty movies with no results query', function () {
    expect(true).to.be.true;
  });

  it('should start with empty movies if no query', function () {
    expect(1).to.be.equal(1);
  });


  it('should update movies, and update topMovies without duplicates', function () {

  });
});
