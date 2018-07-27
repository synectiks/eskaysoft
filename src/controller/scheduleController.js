/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('scheduleController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {

            var vm = this; // jshint ignore:line

            vm.searchSelect = function () {
                $('.selectpicker1').selectpicker('refresh');
            };

            vm.scheduleType = "0";
            vm.selected = false;
            vm.editScreen = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.scheduleList={};
			
            vm.onSelectRow = function (rowData, rowNum) {
           
                if (vm.selected && vm.scheduleList.name == rowData.scheduleName) {
				    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
					
                } else {
				    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.scheduleList.name = rowData.scheduleName;
					vm.scheduleList.no = rowData.id;
                    vm.scheduleList.type = rowData.scheduleType;
                    vm.scheduleList.index = rowData.scheduleIndex;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };
			
            vm.getDropDownValues = function () {
                commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (dropDownContent) {
                    vm.scheduleTypes = dropDownContent[0].scheduleTypes;

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.getScheduleTableHeaders = function () {
                commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                    vm.scheduleTableHeaders = headers[0].scheduleTable;
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.search = function () {
                vm.editScreen = false;
                vm.normalScreen = true;
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/schedules/', 'GET', null).then(function (searchContent) {
					
					var gridDataArr =[];
					angular.forEach(searchContent, function(item){
						var gridDataObj={};
						gridDataObj.scheduleName= item.scheduleName;
						gridDataObj.scheduleIndex= item.scheduleIndex;
						gridDataObj.scheduleType= item.scheduleType;
						gridDataArr.push(gridDataObj);
                
					});
                    vm.data = searchContent;
					vm.selectedName = "";
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.edit = function () {
				vm.scheduleName = vm.scheduleList.name;
                vm.scheduleNo = vm.scheduleList.index;
                vm.scheduleType = vm.scheduleList.type;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };

			vm.delete = function () {

				var reqobj = {
					"id": 2
				};
				commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/schedules/"+vm.scheduleList.index, "DELETE", null).then(function(data){
					vm.search();
				}, function (error) { // jshint ignore:line
					console.log("error", error);
				});
				vm.selected = false;
				vm.messageContainer = true;
				vm.errorMessage = "Schedule saved.";
			};

            vm.create = function () {
                var reqobj = {
                    "scheduleName": vm.scheduleName,
                    "scheduleIndex": vm.scheduleNo,
                    "scheduleType": vm.scheduleType
                };
				commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/schedules/", "POST", null).then(function(data) {
					 vm.search();
					 }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            vm.save = function () {
    		
                var reqobj = {
                    "scheduleName": vm.scheduleName,
                    "scheduleIndex": vm.scheduleNo,
                    "scheduleType": vm.scheduleType
                };

				commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/schedules/", "PUT", null).then(function(data) {
					vm.search();
				}, function (error) { // jshint ignore:line
					console.log("error", error);
                });
            
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            vm.reset = function () {
                vm.scheduleName = "";
                vm.selected = false;
                vm.scheduleNo = "";
                vm.scheduleType = "0";
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
                vm.search();
            };
            vm.getDropDownValues();
            vm.getScheduleTableHeaders();
            vm.search();


    }]);

})();
