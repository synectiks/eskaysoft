/**
 * Created by semianchuk on 08.10.16.
 */
(function() {

  'use strict';


  angular.module('com.synectiks.eskaySoft')
    .controller('schemeController', ['$scope', 'commonLoaderService', function($scope, commonLoaderService) {
      var vm = this; // jshint ignore:line
      var x = {
         "schemeTypes":[{
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
      vm.schemeTypes = x.schemeTypes;
      vm.schemeType = "0";
      vm.selected = false;
      vm.schemeName = "";
      vm.schemeNo = "";
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
        vm.schemeName = list.name;
        vm.schemeNo = list.no;
        vm.schemeType = list.type;
        vm.editScreen = true;
        vm.normalScreen = false;
        vm.messageContainer = false;
        vm.errorMessage = "";
      };

      vm.delete = function() {
        vm.data.splice(list.index, 1);
        vm.selected = false;
        vm.messageContainer = true;
        vm.errorMessage = "Scheme has been Deleted Succesfully";
      };

      vm.save = function() {
        vm.data.splice(list.index, 1);
        var obj = {
          "name": vm.schemeName,
          "no": vm.schemeNo,
          "type": vm.schemeType
        };
        vm.data.push(obj);
        vm.selected = false;
        vm.selectedName = "";
        vm.schemeName = "";
        vm.schemeNo = "";
        vm.schemeType = "0";
        vm.messageContainer = true;
        vm.errorMessage = "Scheme has been Updated Succesfully";
      };
    }]);
})();
