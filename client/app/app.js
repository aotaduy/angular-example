'use strict';

angular.module('moviesApp', [
  'movies.connector',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {


    $locationProvider.html5Mode(true);
  });
