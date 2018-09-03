(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('areasInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.areaInfoList = {};
            vm.typeaheadStaticValue= "Area";
			vm.typeaheadSelected =null;
           

            vm.getScheduleNameArr = function () {
				vm.businessExecutiveArr = [];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/businessexecutive/', 'GET', null).then(function (executiveData) {
                    if (executiveData.length > 0) {
                        angular.forEach(executiveData, function (item) {
                            var executiveObj = {};
                            executiveObj.executiveId = item.id;
                            executiveObj.executiveName = item.name;
                            vm.businessExecutiveArr.push(executiveObj);

                        });

                    }
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };


            //Select
            vm.onSelectRow = function (rowData, rowNum) {
                if (vm.selected && vm.areaInfoList.name == rowData.areaName) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.areaInfoList = {};
                    vm.areaName = "";
                   vm.editScreen = false;
                    vm.areaId = "";
					vm.typeaheadSelected =null;

                } else {
                    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.areaInfoList.name = rowData.areaName;
                    vm.areaInfoList.areaId = rowData.areaId;
                    vm.areaInfoList.businessExecutive = rowData.executiveId;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            vm.search = function () {

                vm.normalScreen = true;

                vm.hiddenColArr = ['executiveId', 'areaId'];
				vm.areInfoDataArr = [];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/area/', 'GET', null).then(function (searchContent) {
                    
                    if (searchContent.length > 0) {
                        vm.noOfViewColumns = 2;
                        angular.forEach(searchContent, function (item) {
                            var tempAreaInfoData = {};
                            tempAreaInfoData.areaId = item.areaId;
                            tempAreaInfoData.areaName = item.areaName;
                            angular.forEach(vm.businessExecutiveArr, function (executiveObj) {
                                if (angular.equals(item.businessExecutiveId, executiveObj.executiveId)) {
                                    tempAreaInfoData.executiveId = item.businessExecutiveId;
                                    tempAreaInfoData.executiveName = executiveObj.executiveName;
                                }
                            });

                            vm.areInfoDataArr.push(tempAreaInfoData);

                        });

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
                    "areaName": vm.areaName,
                    "businessExecutiveId": vm.typeaheadSelected.executiveId
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/area/", "POST", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Area Information saved.";
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
                    "areaName": vm.areaName,
                    "businessExecutiveId": vm.typeaheadSelected.executiveId,
                    "areaId": vm.areaId
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/area/", "PUT", null).then(function (data) {
                    vm.getScheduleNameArr();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
               
                vm.messageContainer = true;
                vm.errorMessage = "Area Information saved.";
            };
            //Reset
            vm.reset = function () {
                vm.areaInfoList = {};
                vm.areaName = "";
                vm.typeaheadSelected=null;
                vm.areaId = "";

                vm.selected = false;
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
                vm.getScheduleNameArr();
            };

            //Delete
            vm.delete = function () {

                var reqobj = {
                    "id": 2
                };
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/area/" + vm.areaInfoList.areaId, "DELETE", null).then(function (data) {
                    vm.getScheduleNameArr();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Area Deleted.";
            };

            //Edit 
            vm.edit = function () {
				 var hasRecord = false;
                angular.forEach(vm.businessExecutiveArr, function (businessExecutiveObj) {
                    if (!hasRecord && angular.equals(vm.areaInfoList.businessExecutive, businessExecutiveObj.executiveId)) {
                        vm.typeaheadSelected =  {"executiveId":businessExecutiveObj.executiveId,"executiveName":businessExecutiveObj.executiveName};
                        hasRecord = true
                    }
                });

                vm.areaName = vm.areaInfoList.name;
                vm.areaId = vm.areaInfoList.areaId;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };



            vm.autoCapitalize = function (val) {
                vm.areaName = val.toUpperCase();
            };


            vm.getScheduleNameArr();
	}])

})();
