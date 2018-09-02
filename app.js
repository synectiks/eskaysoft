;
(function() {
'use strict';
angular
  .module('com.synectiks.eskaySoft', [
  'ngResource',
  'ui.router',
  'main',
   'pascalprecht.translate',
  //'ngMap',
  'broadcast',
'ngAnimate',
'ngStorage',
  'ui.bootstrap'
  ]).run(['$rootScope', '$state',
    function ($rootScope, $state) {
        $rootScope.$state = $state;
    }
]);
}());
