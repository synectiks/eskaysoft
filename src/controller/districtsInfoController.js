
(function() {

  'use strict';


  angular.module('com.synectiks.eskaySoft')
    .controller('districtsInfoController', ['$scope', function($scope) {
      var vm = this; // jshint ignore:line
vm.data = [];
vm.stateName="0";
 vm.stateobj = {
         "states":[{
            "name": "Andhra Pradesh",
            "description": ""
      	  },{
            "name": "Telangana",
            "description": ""
      	  }
		  ]
      };
	  
	  
	   vm.save = function() {

        
        var obj = {
          "districtName": vm.districtName,
          "stateName": vm.stateName
        };
        vm.data.push(obj);
        vm.reset();
        vm.messageContainer = true;
        vm.errorMessage = "District saved.";
      };
vm.reset = function(){
        vm.districtName = "";
        vm.stateName = false;
        vm.messageContainer = false;
        vm.data = [];
      };
	  
    }]);
})();
