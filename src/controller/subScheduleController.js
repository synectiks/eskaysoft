(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('subScheduleController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {
            var vm = this; // jshint ignore:line
            
            vm.subScheduleIndexArr = [];
            vm.scheduleNameValue = "0";
            vm.prevSubScheduleIndex = "";

            vm.getScheduleNameArr = function () {
				vm.scheduleNameArr = [];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/schedules/', 'GET', null).then(function (scheduleData) {
                    if (scheduleData.length > 0) {
                        angular.forEach(scheduleData, function (item) {
                            var scheduleObj = {};
                            scheduleObj.scheduleId = item.id;
                            scheduleObj.scheduleName = item.scheduleName;
                            vm.scheduleNameArr.push(scheduleObj);

                        });
                    }
					vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.search = function () {
                vm.normalScreen = true;
                vm.hiddenColArr = ['subScheduleId', 'scheduleId'];
				vm.subScheduleDataArr = [];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/subschedules/', 'GET', null).then(function (searchContent) {
                    if (searchContent.length > 0) {
                        
                        angular.forEach(searchContent, function (item) {
                            var tempSubScheduleData = {};
                            tempSubScheduleData.subScheduleId = item.subScheduleId;
                            tempSubScheduleData.subScheduleName = item.subScheduleName;
                            tempSubScheduleData.subScheduleIndex = item.subScheduleIndex;
                            vm.subScheduleIndexArr.push(item.subScheduleIndex);
                            angular.forEach(vm.scheduleNameArr, function (schObj) {
                                if (angular.equals(item.scheduleId, schObj.scheduleId)) {
                                    tempSubScheduleData.scheduleId = item.scheduleId;
                                    tempSubScheduleData.scheduleName = schObj.scheduleName;
                                }
                            });
                            vm.subScheduleDataArr.push(tempSubScheduleData);
                        });

                        //var jsonKeys = Object.keys(vm.subScheduleDataArr[0]);
                        vm.noOfViewColumns = 3;
                        vm.selectedName = "";
                        vm.messageContainer = false;
                        vm.errorMessage = "";
                    }
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };



            vm.create = function () {
                var reqobj = {
                    "subScheduleName": vm.subScheduleName,
                    "subScheduleIndex": vm.subScheduleIndex,
                    "scheduleId": vm.scheduleNameValue
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/subschedules/", "POST", null).then(function (data) {
                     vm.reset();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
               
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };
            vm.subScheduleList = {};

            vm.onSelectRow = function (rowData, rowNum) {

                if (vm.selected && vm.subScheduleList.name == rowData.subScheduleName) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.subScheduleList = {};
                    vm.subScheduleName = "";
                    vm.subScheduleIndex = "";
                    vm.scheduleId = "";

                } else {
                    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.subScheduleList.subScheduleName = rowData.subScheduleName;
                    vm.subScheduleList.subScheduleIndex = rowData.subScheduleIndex;
                    vm.subScheduleList.scheduleId = rowData.scheduleId;
                    vm.subScheduleList.subScheduleId = rowData.subScheduleId;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };
            //Edit
            vm.edit = function () {
                vm.subScheduleName = vm.subScheduleList.subScheduleName;
                vm.subScheduleIndex = vm.subScheduleList.subScheduleIndex;
                vm.prevSubScheduleIndex = vm.subScheduleList.subScheduleIndex;

                var hasRecord = false;
                angular.forEach(vm.scheduleNameArr, function (scheduleNameObj) {
                    if (!hasRecord && angular.equals(vm.subScheduleList.scheduleId, scheduleNameObj.scheduleId)) {
                        vm.scheduleNameValue = "" + scheduleNameObj.scheduleId;
                        hasRecord = true;
                    }
                });
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };


            //Confirm 
            vm.confirm = function () {
                if (confirm("Do you want to Delete?")) {
                    vm.delete();
                } else {
                    vm.errorMessage = "";
                }
            }

            //Save
            vm.save = function () {
                vm.editScreen = true;
                var reqobj = {
                    "subScheduleName": vm.subScheduleName,
                    "subScheduleIndex": vm.subScheduleIndex,
                    "scheduleId": vm.scheduleNameValue,
                    "subScheduleId": vm.subScheduleList.subScheduleId
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/subschedules/", "PUT", null).then(function (data) {
                    vm.getScheduleNameArr();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
               
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };


            //Reset
            vm.reset = function () {
                vm.subScheduleList = {};
                vm.subScheduleName = "";
                vm.subScheduleIndex = "";
                vm.scheduleId = "";
                vm.scheduleNameValue = "";
                vm.selected = false;
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
				vm.getScheduleNameArr();		
				
            };
            //Delete
            vm.delete = function () {

                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/subschedules/" + vm.subScheduleList.subScheduleId, "DELETE", null).then(function (data) {
					
                    vm.reset();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Schedule Deleted.";
            };

            vm.validateSchIndex = function () {
                vm.hasDuplicateScheIndex = false;
                vm.errorMessage = "";
                vm.messageContainer = false;

                if (!vm.hasDuplicateScheIndex) {
                    angular.forEach(vm.subScheduleIndexArr, function (subScheduleIndex) {
                        if (angular.equals(vm.subScheduleIndex, subScheduleIndex) && !angular.equals(vm.subScheduleIndex, vm.prevSubScheduleIndex)) {
                            vm.hasDuplicateScheIndex = true;
                            vm.messageContainer = true;
                            vm.errorMessage = "Duplicates in Schedule Index are not allowed ";
                        }
                    });
                }
            };

            vm.getScheduleNameArr();
			vm.search();


     }]);
})();
