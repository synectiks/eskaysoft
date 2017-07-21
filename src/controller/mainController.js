/**
 * Created by semianchuk on 08.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .controller('mainController', [ '$scope', function ($scope) {
      var vm = this; // jshint ignore:line
      vm.reg = false;
      vm.log = false;
      vm.about = false;
      vm.contact = false;
        vm.registration = function(expression){
          vm.reg = false;
          vm.log = false;
          vm.about = false;
          vm.contact = false;
          switch (expression) {
           case 'reg':
               vm.reg = true;
               break;
           case 'contact':
            vm.contact = true;
             break;
          case 'about':
            vm.about = true;
            break;
            case 'log':
            vm.log = true;
            break;
       }

        };
        //$scope.getFactory  = mainFactory.getPrivate();
        //$scope.getService  = mainService.getPrivate();
        //$scope.getProvider = mainProvider.getPrivate();

    }]);
})();
