/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('scheduleController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {

            var vm = this; // jshint ignore:line
            vm.scheduleType = "0";
            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.scheduleList = {};
            vm.scheduleIndexArr = [];
            vm.prevScheduleIndex = "";
            vm.searchSelect = function () {
                //  $('.selectpicker1').selectpicker('refresh');
            };

            vm.onSelectRow = function (rowData, rowNum) {
                if (vm.selected && vm.scheduleList.name == rowData.scheduleName) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.scheduleList = {};
                    vm.scheduleName = "";
                    vm.scheduleNo = "";
                    vm.scheduleType = "0";
                    vm.scheduleId = "";

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

            vm.retrieveAllScheduleIndexs = function () {
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/schedulesIndexs', 'GET', null).then(function (searchContent) {
                    vm.scheduleIndexList = searchContent;

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.search = function () {
                vm.normalScreen = true;
                vm.hiddenColArr = ['id'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/schedules/', 'GET', null).then(function (searchContent) {
                    if (searchContent.length > 0) {
                        var jsonKeys = Object.keys(searchContent[0])
                        vm.noOfViewColumns = jsonKeys.length - vm.hiddenColArr.length;

                        angular.forEach(searchContent, function (item) {
                            var hasScheduleType = false;
                            vm.scheduleIndexArr.push(item.scheduleIndex);
                            angular.forEach(vm.scheduleTypes, function (scheduleTypeObj) {
                                if (!hasScheduleType && angular.equals(item.scheduleType, scheduleTypeObj.code)) {
                                    item.scheduleType = scheduleTypeObj.description;
                                    hasScheduleType = true
                                }
                            });
                        });
                        vm.data = searchContent;
                        vm.selectedName = "";
                        vm.messageContainer = false;
                        vm.errorMessage = "";
                    }

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.edit = function () {
                vm.scheduleName = vm.scheduleList.name;
                vm.scheduleNo = vm.scheduleList.index;
                vm.prevScheduleIndex = vm.scheduleList.index;
                var hasRecord = false;
                angular.forEach(vm.scheduleTypes, function (scheduleTypeObj) {
                    if (!hasRecord && angular.equals(vm.scheduleList.type, scheduleTypeObj.description)) {
                        vm.scheduleList.type = scheduleTypeObj.code;
                        hasRecord = true
                    }
                });
                vm.scheduleType = vm.scheduleList.type;
                vm.scheduleId = vm.scheduleList.no;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };

            vm.delete = function () {
                var reqobj = {
                    "id": 2
                };
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/schedules/" + vm.scheduleList.no, "DELETE", null).then(function (data) {
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
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/schedules/", "POST", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            vm.save = function () {
                vm.editScreen = true;
                var reqobj = {
                    "scheduleName": vm.scheduleName,
                    "scheduleIndex": vm.scheduleNo,
                    "scheduleType": vm.scheduleType,
                    "id": vm.scheduleList.no
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/schedules/", "PUT", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });

                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };


            vm.validateSchIndex = function () {
                vm.hasDuplicateScheIndex = false;
                vm.errorMessage = "";
                vm.messageContainer = false;

                if (!vm.hasDuplicateScheIndex) {
                    angular.forEach(vm.scheduleIndexArr, function (scheduleIndex) {
                        if (angular.equals(vm.scheduleNo, scheduleIndex) && !angular.equals(vm.scheduleNo, vm.prevScheduleIndex)) {
                            vm.hasDuplicateScheIndex = true;
                            vm.messageContainer = true;
                            vm.errorMessage = "Duplicates in Schedule Index are not allowed ";
                        }
                    });
                }
            };

            vm.reset = function () {
                vm.scheduleList = {};
                vm.scheduleName = "";
                vm.scheduleId = "";
                vm.selected = false;
                vm.scheduleNo = "";
                vm.scheduleType = "0";
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
                vm.search();
            };

            $scope.GetValue = function (scheduleType) {
                var scheduleTypeCode = vm.searchBySchedule.type;
                var scheduleTypeDesc = $.grep(vm.scheduleTypes, function (scheduleType) {
                    return scheduleType.code == scheduleTypeCode;
                })[0].description;
                vm.searchBySchedulTypeDescr = scheduleTypeDesc
            };

            vm.getDropDownValues();
            vm.search();
    }]);

})();
