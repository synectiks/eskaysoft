/**
 * Created by semianchuk on 08.10.16.
 */
(function() {

  'use strict';


  angular.module('com.synectiks.eskaySoft')
    .controller('scheduleController', ['$scope', 'commonLoaderService', function($scope, commonLoaderService) {
		console.log("111111111");
		var vm = this; // jshint ignore:line
      var x = {
         "scheduleTypes":[{
            "name": "firstType",
            "description": ""
      	  },{
            "name": "secondType",
            "description": ""
      	  },{
            "name": "thirdType",
            "description": ""
      	  },{
            "name": "fourthType",
            "description": ""
      	  }]
      };
      vm.scheduleTypes = x.scheduleTypes;
      vm.scheduleType = "0";
      vm.selected = false;
      vm.scheduleName = "";
      vm.scheduleNo = "";
      vm.data = [];
      vm.editScreen = false;
      vm.normalScreen = true;
      vm.errorMessage = "";
      vm.messageContainer = false;
      var list = {};
      vm.search = function() {
		  console.log("rrrr");
        vm.editScreen = false;
        vm.normalScreen = true;
        commonLoaderService.load_Data(null, 'src/_config/searchScheme_content.json', 'GET', null).then(function(searchContent) {
          vm.data = searchContent.SearchSchemeCodes;
          vm.selectedName = "";
          vm.messageContainer = false;
          vm.errorMessage = "";
        }, function(error) { // jshint ignore:line
          console.log("error", error);
        });
      };

      vm.setSelected = function(name, no, type, index) {
        vm.selectedName = name;
        vm.selected = true;
        list.name = name;
        list.no = no;
        list.type = type;
        list.index = index;
        vm.messageContainer = false;
        vm.errorMessage = "";
      };

      vm.edit = function() {
        vm.scheduleName = list.name;
        vm.scheduleNo = list.no;
        vm.scheduleType = list.type;
        vm.editScreen = true;
        vm.normalScreen = false;
        vm.messageContainer = false;
        vm.errorMessage = "";
      };

      vm.delete = function() {
        vm.data.splice(list.index, 1);
        vm.selected = false;
        vm.messageContainer = true;
        vm.errorMessage = "schedule has been Deleted Succesfully";
      };

      vm.save = function() {
		  
		  console.log("222")
        vm.data.splice(list.index, 1);
        var obj = {
          "name": vm.scheduleName,
          "no": vm.scheduleNo,
          "type": vm.scheduleType
        };
        vm.data.push(obj);
        vm.selected = false;
        vm.selectedName = "";
        vm.scheduleName = "";
        vm.scheduleNo = "";
        vm.scheduleType = "0";
        vm.messageContainer = true;
        vm.errorMessage = "schedule has been Updated Succesfully";
      };

    }]);
})();
