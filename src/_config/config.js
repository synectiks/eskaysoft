/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .config(['$locationProvider', '$stateProvider', '$translateProvider', function ($locationProvider, $stateProvider, $translateProvider) {
            $locationProvider.html5Mode(true);

            $translateProvider.useStaticFilesLoader({
                prefix: 'messages/eskaysoftConstants_',
                suffix: '.json'
            });
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escape');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'public/templates/login.html',
                    controller: 'loginInfoController',
                    controllerAs: 'vm'
                })
                .state('schedule', {
                    url: '/schedule',
                    templateUrl: 'public/templates/schedule.html',
                    controller: 'scheduleController',
                    controllerAs: 'vm'
                })

                .state('bankInfo', {
                    url: '/bankInfo',
                    templateUrl: 'public/templates/bankInfo.html',
                    controller: 'bankInfoController',
                    controllerAs: 'vm'
                })
                .state('statesInfo', {
                    url: '/statesInfo',
                    templateUrl: 'public/templates/statesInfo.html',
                    controller: 'statesInfoController',
                    controllerAs: 'vm'
                })
                .state('districtsInfo', {
                    url: '/districtsInfo',
                    templateUrl: 'public/templates/districtsInfo.html',
                    controller: 'districtsInfoController',
                    controllerAs: 'vm'
                })
                .state('businessExeInfo', {
                    url: '/businessExeInfo',
                    templateUrl: 'public/templates/businessExeInfo.html',
                    controller: 'businessExeInfoController',
                    controllerAs: 'vm'
                })
                .state('areasInfo', {
                    url: '/areasInfo',
                    templateUrl: 'public/templates/areasInfo.html',
                    controller: 'areasInfoController',
                    controllerAs: 'vm'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'public/templates/login.html',
                    controller: 'loginInfoController',
                    controllerAs: 'vm'
                })
                .state('registration', {
                    url: '/registration',
                    templateUrl: 'public/templates/registration.html',
                    controller: 'registrationInfoController',
                    controllerAs: 'vm'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'public/templates/contact.html',
                    controller: 'contactController',
                    controllerAs: 'vm'
                })
                .state('registrationForm', {
                    url: '/registrationForm',
                    templateUrl: 'public/templates/registrationForm.html',
                    controller: 'registrationFormController',
                    controllerAs: 'vm'
                })
                .state('component', {
                    url: '/component',
                    templateUrl: 'public/templates/component.html'
                })
                .state('module', {
                    url: '/module',
                    templateUrl: 'public/templates/newmodule.html'
                })
                .state('provider', {
                    url: '/provider',
                    templateUrl: 'public/templates/provider.html',
                    controller: 'mainController'
                })
                .state('subschedule', {
                    url: '/subschedule',
                    templateUrl: 'public/templates/subSchedules.html',
                    controller: 'subScheduleController',
                    controllerAs: 'vm'
                })
                .state('manufacturer', {
                    url: '/manufacturer',
                    templateUrl: 'public/templates/manufacturer.html',
                    controller: 'manufacturerController',
                    controllerAs: 'vm'
                })
    }]);
})();
