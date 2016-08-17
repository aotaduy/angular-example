(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo', [])
        .config(configModule)
        .run(runModule)

    function configModule() {

    }
    runModule.$inject = [
        '$http',
    ]

    function runModule($http) {
        $http.defaults.transformRequest = [transformRequestAsFormPost];
    }

    function transformRequestAsFormPost(data, getHeaders) {
        var headers = getHeaders();
        headers["content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
        return ($.param(data));
    }




})()
