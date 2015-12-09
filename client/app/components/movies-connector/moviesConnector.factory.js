(function() {
    'use strict';
    angular
        .module('movies.connector')
        .factory('moviesConnector', moviesConnectorFactory);

    /**
     * @ngInject
     */
    moviesConnectorFactory.$inject = [
        '$q',
        '$http'
    ];

    function moviesConnectorFactory(
        $q,
        $http
    ) {
		
		var cachedMovies = [];
		
        var service = {
            cachedConfiguration: null,
            topRatedMovies: topRatedMovies,
            configuration: configuration,
            search: search
        };

        function topRatedMovies() {
            return $http.get('/api/movies/');
        }

        function search(query) {			
			
			
			var index = queryIsCached(query);
			
			if(index == -1){
				var httpPromise = $http.get('/api/movies/search/' + query);
				httpPromise
					.then(function (response) {
						addResponseToCache(query,response);
					});
					
				return httpPromise;
			}
			else{
				return $q.when(cachedMovies[index].value);							
			}
        }
		
		function addResponseToCache(query, response){
								
			if(cachedMovies.length > 100){					
				cachedMovies.splice(0,cachedMovies.length);				
			}
			
			cachedMovies.push({key:query, value: response});			
		}
		
		function queryIsCached(query)
		{
			var index = -1;
			
			for(var i = 0, len = cachedMovies.length; i < len; i++){
				
				if( cachedMovies[i].key == query){
					index = i;
					break;	
				}
			}							
			
			return index;
		}

        function configuration() {
            if (service.cachedConfiguration) {
                return $q.when(service.cachedConfiguration);
            }
            return $http.get('/api/movies/configuration').then(function sucessCallback(response) {
					service.cachedConfiguration = response;
                return response;
            });
        }

        return service;

    }

})();
