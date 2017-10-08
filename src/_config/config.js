/**
 * Created by semianchuk on 08.10.16.
 */
 (function() {

  'use strict';

angular.module('com.synectiks.eskaySoft')
    .config(['$locationProvider','$stateProvider', function($locationProvider,$stateProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url         : '/',
                templateUrl : 'public/templates/home.html',
                controller  : 'mainController',
                controllerAs : 'vm'
            })
            .state('schedule', {
                url         : '/schedule',
                templateUrl : 'public/templates/schedule.html',
                controller  : 'scheduleController',
                controllerAs : 'vm'
            })
            .state('contact', {
                url         : '/contact',
                templateUrl : 'public/templates/contact.html',
                controller  : 'contactController',
                controllerAs : 'vm'
            })
            .state('registrationForm', {
                url         : '/registrationForm',
                templateUrl : 'public/templates/registrationForm.html',
                controller  : 'registrationFormController',
                controllerAs : 'vm'
            })
            .state('component', {
                url         : '/component',
                templateUrl : 'public/templates/component.html'
            })
            .state('module', {
                url         : '/module',
                templateUrl : 'public/templates/newmodule.html'
            })
            .state('provider', {
                url         : '/provider',
                templateUrl : 'public/templates/provider.html',
                controller  : 'mainController'
            })
    }]);
})();
