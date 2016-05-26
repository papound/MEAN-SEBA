/**
 * Created by Chanawatn Pound on 26-May-16.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

var routeApp = angular.module('routeApp', [uiRouter]);

routeApp.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

$stateProvider
    .state('test', {
        url: '/public',
        template: require('index.html'),
    });

//$locationProvider.html5Mode(true);
});