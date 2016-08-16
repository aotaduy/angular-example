(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo', [])
        .config(configModule)
        .run(runModule)

    function configModule($httpProvider) {
    //  $httpProvider.interceptors.push('timeoutRetry');

    }
    runModule.$inject = [
        '$http',
        '$cacheFactory'
    ]

    function runModule($http, $cacheFactory) {
        $http.defaults.cache = $cacheFactory('randomCache', {capacity: 3});
        console.log($http.defaults.cache);
        //$http.defaults.transformResponse.push(transformFromXml);
    }

    function transformFromXml(data, headers) {
        var contentType = headers('Content-Type'),
            x2js = new X2JS(),
            answer;
        if (typeof data === 'string') {
            if ((contentType && (contentType.indexOf('text/xml') === 0))) {
                answer = x2js.xml_str2json(data);
                answer.value = parseFloat(answer.value);
            }
        }
        return answer;
    }

})()
