
(function() {

  'use strict';


  angular.module('com.synectiks.eskaySoft')
    .controller('loginInfoController', ['$scope', '$state', function($scope, $state) {
      var vm = this; // jshint ignore:line
      vm.login = function(){
        $state.go('scheme');
      };

    }]);
})();
