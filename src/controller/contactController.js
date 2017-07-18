/**
 * Created by semianchuk on 08.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .controller('contactController', [ '$scope',  function ($scope) {
      var vm = this; // jshint ignore:line
        vm.contactMe = {
            email  : 'fix20152@gmail.com',
            github : 'https://github.com/fix2015'
        }

    }]);
})();
