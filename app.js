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
  'broadcast'
  ]).run(['$rootScope', '$state',
    function ($rootScope, $state) {
        $rootScope.$state = $state;
    }
]);
}());
