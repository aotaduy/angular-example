'use strict';

angular
    .module('movies.connector', [])
    .constant('cache_calls', {
        SEARCH_MOVIES: 100,
        INFO_MOVIES: 100
    });
