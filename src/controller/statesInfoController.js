(function () {
    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('statesInfoController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {
            var vm = this; // jshint ignore:line

            vm.stateZone = "0";
            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.stateList = {};

            //Select
            vm.onSelectRow = function (rowData, rowNum) {
                if (vm.selected && vm.stateList.name == rowData.stateName) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.stateList = {};
                    vm.stateName = "";
                    vm.stateCode = "";
                    vm.stateZone = "0";
                    vm.stateId = "";

                } else {
                    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.stateList.name = rowData.stateName;
                    vm.stateList.code = rowData.stateCode;
                    vm.stateList.zone = rowData.zone;
                    vm.stateList.id = rowData.id;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            //Get Dropdown Content
            vm.getDropDownValues = function () {
                commonLoaderService.load_Data(null, 'messages/stateInfoMockData.json', 'GET', null).then(function (dropDownContent) {
                    vm.stateZones = dropDownContent[0].stateZones;

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            //Search
            vm.search = function () {
                vm.normalScreen = true;

                vm.hiddenColArr = ['id'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/states/', 'GET', null).then(function (searchContent) {

                    if (searchContent.length > 0) {
                        var jsonKeys = Object.keys(searchContent[0])
                        vm.noOfViewColumns = jsonKeys.length - vm.hiddenColArr.length;

                        angular.forEach(searchContent, function (item) {
                            var hasStateZone = false;
                            angular.forEach(vm.stateZones, function (stateZoneObj) {
                                if (!hasStateZone && angular.equals(item.zone, stateZoneObj.code)) {
                                    item.zone = stateZoneObj.description;
                                    hasStateZone = true
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

            //Create
            vm.create = function () {

                var reqobj = {
                    "stateName": vm.stateName,
                    "stateCode": vm.stateCode,
                    "zone": vm.stateZone
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/states/", "POST", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            //Reset
            vm.reset = function () {
                vm.stateList = {};
                vm.stateName = "";
                vm.stateCode = "";
                vm.stateZone = "";

                vm.selected = false;
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
                vm.search();
            };

            //Delete
            vm.delete = function () {

                var reqobj = {
                    "id": 2
                };
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/states/" + vm.stateList.id, "DELETE", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            //Edit 
            vm.edit = function () {

                vm.stateName = vm.stateList.name;
                vm.stateCode = vm.stateList.code;

                var hasRecord = false;
                angular.forEach(vm.stateZones, function (stateZoneObj) {

                    if (!hasRecord && angular.equals(vm.stateList.zone, stateZoneObj.description)) {
                        vm.stateList.zone = stateZoneObj.code;
                        hasRecord = true
                    }
                });

                vm.stateZone = vm.stateList.zone;
                vm.stateId = vm.stateList.id;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };
            vm.getDropDownValues();
            vm.search();
    }]);
})();
