/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('scheduleController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {

            var vm = this; // jshint ignore:line

            /* $timeout(function () {
                 $('.selectpicker').selectpicker('refresh');
             }, 0);*/

            /*angular.element(document).ready(function () {
                $('.selectpicker').selectpicker('refresh');
            });*/

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

			vm.onSelectRow= function (rowData){
				console.log("onSelectRowonSelectRowonSelectRow", rowData);
				vm.selectedName = rowData.name;
				 if (vm.selected && vm.selectedName == list.name) {
                    vm.selectedName = null;
                    vm.selected = false;
                } else {
                    vm.selected = true;
                    list.name = rowData.name;
                    list.no = rowData.no;
                    list.type = rowData.type;
                    list.index = rowData.index;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
			};
            vm.getDropDownValues = function () {
                commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (dropDownContent) {
                    vm.scheduleTypes = dropDownContent.scheduleTypes;
					vm.scheduleTableHeaders=dropDownContent.tableHeaders;
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };
			
            vm.getDropDownValues();
            vm.search = function () {
                vm.editScreen = false;
                vm.normalScreen = true;
                commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (searchContent) {
                    vm.data = searchContent.SearchSchemeCodes;
                    vm.selectedName = "";
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };
			vm.search();
            vm.edit = function () {
                vm.scheduleName = list.name;
                vm.scheduleNo = list.no;
                vm.scheduleType = list.type;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };

            vm.delete = function () {
                vm.data.splice(list.index, 1);
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Schedule deleted.";
            };

            vm.save = function () {

                vm.data.splice(list.index, 1);
                var obj = {
                    "name": vm.scheduleName,
                    "no": vm.scheduleNo,
                    "type": vm.scheduleType
                };
                vm.data.push(obj);
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            vm.create = function () {
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Schedule Created.";
            };

            vm.reset = function () {
                vm.scheduleName = "";
                vm.selected = false;
                vm.scheduleNo = "";
                vm.scheduleType = "0";
                vm.selectedName = "";
                vm.messageContainer = false;
                vm.editScreen = false;
                vm.schedule.name = "";
                vm.schedule.type = "";
                vm.search();
            };
  

    }]);
})();
