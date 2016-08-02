(function() {
    'use strict';
    angular.module('moviesApp')
        .run(configureRouter);

    configureRouter.$inject = [
        '$state',
        '$log',
        '$rootScope'
    ];

    function configureRouter($state, $log, $rootScope) {
      //  $rootScope.$on('$stateChangeStart', handleStateChange);
        $rootScope.$on('$stateChangeError', handleStateError);
        $rootScope.$on('$stateNotFound', handleStateNotFound);

        function handleStateError(event, toState, toParams, fromState, fromParams, error) {

            var logError = {
                title: 'State Transition Error',
                fromState: fromState,
                toState: toState,
                toParams: toParams,
                stateName: toState.name,
                error: error
            };
            // redirect if redirect to provided
            if (error.redirectTo) {
                $log.error(logError);
                //    event.preventDefault();
                $state.go(error.redirectTo);
                return;
            }
            handleError(logError, event);
        }

        function handleStateNotFound(event, unfound, fromState) {
            var logError = {
                title: 'State not found',
                fromState: fromState,
                stateName: unfound.to,
                toParams: unfound.toParams
            };
            handleError(logError, event);
        }

        function handleError(logError, event) {
            $log.error(logError);
            event.preventDefault();
        }
    }

  })();
