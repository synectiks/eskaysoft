
(function() {

  'use strict';

  angular.module('com.synectiks.eskaySoft')
    .controller('loginInfoController', ['commonLoaderService', '$state', '$sessionStorage',  function(commonLoaderService, $state, $sessionStorage) {
      var vm = this; // jshint ignore:line
      vm.login = function(){
		   var reqobj = {
                    "usernameOrEmail": "kanandku",
                    "password": "secret"
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/auth/signin", "POST", null).then(function (data) {
					//commonFactory.setAuthToken(data.accessToken);
					$sessionStorage.authToken="Bearer "+data.accessToken;
					$state.go('schedule');
                   
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
        //$state.go('schedule');
      };

	  vm.signup = function(){
        $state.go('registration');
      };

    }]);
})();
