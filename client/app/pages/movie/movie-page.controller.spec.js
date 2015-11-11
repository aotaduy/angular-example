'use strict';

describe('Controller: MainCtrl', function () {

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

  it('should updateNames properly', function () {
    controller.updatedSearch('star');
    $httpBackend.flush();
    expect(controller.topMovieNames.length).to.equal(2);
  });
});
