(function() {

  'use strict';


  angular.module('com.synectiks.eskaySoft')
    .controller('registrationInfoController', ['$scope', function($scope) {
      var vm = this;
      vm.message = "";
      vm.create = function(){
          vm.message = "Registered Successfully";

      };
    }]);
})();
