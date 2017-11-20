/**
 * Created by semianchuk on 08.10.16.
 */
(function() {

  'use strict';


  angular.module('com.synectiks.eskaySoft')
    .controller('scheduleController', ['$scope', 'commonLoaderService', function($scope, commonLoaderService) {
      var vm = this; // jshint ignore:line
      vm.showTable = false;
      vm.showModel = false;
      vm.edit = true;
      vm.errorMessage = "";
      vm.messageContainer = false;
      var editObjectIndex;


      function onLoad() {
        commonLoaderService.load_Data(null, 'src/_config/dropdown_content.json', 'GET', null).then(function(data) {
          vm.dropdownValues = data.DropDownCodes;
        }, function(error) { // jshint ignore:line
          console.log("error", error);
        });
      }
      vm.delete = function(deleteAll, index) {
        vm.messageContainer = true;
        if (deleteAll) {
          vm.data = [];
          vm.showTable = false;
          vm.errorMessage = "Deleted All Schedules Succesfully";
        } else {
          vm.data.splice(index, 1);
          vm.errorMessage = "Deleted Schedule Succesfully";
        }
      };
      vm.search = function() {
		  console.log("hhhhhh");
        vm.showTable = true;
        vm.messageContainer = false;
        commonLoaderService.load_Data(null, 'src/_config/searchSchedule_content.json', 'GET', null).then(function(searchContent) {
          vm.data = searchContent.SearchScheduleCodes;

        }, function(error) { // jshint ignore:line
          console.log("error", error);
        });
      };
      vm.addEditSchedule = function(schedule, mainschedule, index) {
        vm.showModel = true;
        vm.schedule = schedule;
        vm.mainSchedule = mainschedule;
        if (mainschedule === '0') {
          vm.edit = false;
        } else {
          editObjectIndex = index;
        }
      };
      vm.createSchedule = function() {
        vm.showModel = false;
        vm.messageContainer = true;
        vm.errorMessage = "Created Schedule Succesfully";
        var obj = {
          "schedule": vm.schedule,
          "mainSchedule": vm.mainSchedule
        };
        vm.data.push(obj);
      };
      vm.editSchedule = function() {
        vm.showModel = false;
        vm.messageContainer = true;
        vm.data.splice(editObjectIndex, 1);
        var obj = {
          "schedule": vm.schedule,
          "mainSchedule": vm.mainSchedule
        };
        vm.data.push(obj);
        vm.errorMessage = "Edited Schedule Succesfully";
      };

      onLoad();

    }]);
})();
