describe('Service: moviesConnector', function() {
    'use strict';
   var
        service,
       $httpBackend;

   // Refresh the $filter every time.
   beforeEach(module('movies.connector'));
   beforeEach(inject(function (_$httpBackend_, _moviesConnector_) {
     $httpBackend = _$httpBackend_;
     $httpBackend.whenGET('/api/movies/search/star')
       .respond({
           results:[
               {title: 'Star Wars'},
               {title: 'Star Trek'}
           ]
       });
       $httpBackend.whenGET('/api/movies/playing/')
         .respond({
             results:[
                 {title: 'Deadpool'},
                 {title: 'Superman'}
             ]
         });
         $httpBackend.whenGET('/api/movies/')
           .respond({
               results:[
                   {title: 'Deadpool'},
                   {title: 'Superman'}
               ]
           });
       service = _moviesConnector_;
   }));

   afterEach(function () {
     $httpBackend.verifyNoOutstandingRequest();
   });

    it('should get nowPlaying movies', function() {
        service.nowPlaying().then(function (result) {
          expect(result.data.results[0].title).to.equal('Deadpool');
        });
        $httpBackend.flush();
    });


    it('should get nowPlaying movies', function() {
      $httpBackend.expectGET('/api/movies/playing/')
        .respond({
            results:[
                {title: 'Deadpool'}
            ]
        });
        service.nowPlaying();
        $httpBackend.flush();
    });

    it('should get nowPlaying movies and top rated', function() {
      $httpBackend.expectGET('/api/movies/playing/')
        .respond({
            results:[
                {title: 'Deadpool'}
            ]
        });
        service.nowPlaying();
        service.topRatedMovies();
        $httpBackend.flush();
    });
    it('should search', function() {
      $httpBackend.expect('GET', /api\/movies\/search\/.*/ )
        .respond({
            results:[
                {title: 'Deadpool'},
                {title: 'Star wars'},
                {title: 'Star trek'}
            ]
        });
        service.search('peperino');
        $httpBackend.flush();
    });
});
