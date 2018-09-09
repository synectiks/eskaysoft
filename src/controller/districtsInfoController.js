(function () {
    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('districtsInfoController', ['commonLoaderService', function (commonLoaderService) {
			
            var vm = this; // jshint ignore:line
			vm.typeaheadSelected = null;
			vm.typeaheadStaticValue= "Districts";
			
            vm.getStates = function () {
				 vm.statesDataArr = [];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/states/', 'GET', null).then(function (statesData) {
                    angular.forEach(statesData, function (item) {
                        var stateObj = {};
                        stateObj.id = item.id;
                        stateObj.stateName = item.stateName;
                        vm.statesDataArr.push(stateObj);
                    });
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.search = function () {
                vm.normalScreen = true;
                vm.hiddenColArr = ['districtId', 'statesId'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/districts/', 'GET', null).then(function (searchContent) {
                    if (searchContent.length > 0) {
                        vm.data = [];
                        angular.forEach(searchContent, function (item) {
                            var tempDistrictData = {};
                            tempDistrictData.districtId = item.districtId;
                            tempDistrictData.districtName = item.districtName;
                            angular.forEach(vm.statesDataArr, function (stateObj) {
                                if (angular.equals(item.statesId, stateObj.id)) {
                                    tempDistrictData.statesId = item.statesId;
                                    tempDistrictData.stateName = stateObj.stateName;
                                }
                            });
                            vm.data.push(tempDistrictData);
                        });

                        vm.noOfViewColumns = 2;
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
                    "districtName": vm.districtName,
                    "statesId": vm.typeaheadSelected.id
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/districts/", "POST", null).then(function (data) {
                    vm.getStates();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "District saved.";
            };

            vm.districtsList = {};

            vm.onSelectRow = function (rowData, rowNum) {

                if (vm.selected && vm.districtsList.name == rowData.districtName) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.districtsList = {};
                    vm.districtName = "";
					vm.typeaheadSelected=null;

                } else {
                    vm.selected = true;
					if(!vm.editScreen){
						vm.selectedRow = rowNum;
						vm.districtsList.districtName = rowData.districtName;
						vm.districtsList.statesId = rowData.statesId;
						vm.districtsList.districtId = rowData.districtId;
					}
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };


            vm.edit = function () {
                vm.districtName = vm.districtsList.districtName;
                var hasRecord = false;
                angular.forEach(vm.statesDataArr, function (stateObj) {
                    if (!hasRecord && angular.equals(vm.districtsList.statesId, stateObj.id)) {
						vm.typeaheadSelected={"id":stateObj.id,"stateName":stateObj.stateName};
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
                    "districtName": vm.districtName,
                    "statesId": vm.typeaheadSelected.id,
                    "districtId": vm.districtsList.districtId
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/districts/", "PUT", null).then(function (data) {
                    vm.reset();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                
                vm.messageContainer = true;
                vm.errorMessage = "District saved.";
            };

            //Reset
            vm.reset = function () {
                vm.districtsList = {};
                vm.districtName = "";
                vm.typeaheadSelected=null;
                vm.selected = false;
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
				vm.typeaheadSelected = null;
				vm.searchBy="";
				vm.searchText="";
				vm.searchByStateName="";
				vm.searchByDistrictName="";
                vm.search();
            };

            vm.delete = function () {
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/districts/" + vm.districtsList.districtId, "DELETE", null).then(function (data) {
                    vm.getStates();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "District Deleted.";
            };

            vm.getStates();

            vm.autoCapitalize = function (val) {
				if(!angular.isUndefined(val)){
					vm.districtName = val.toUpperCase();
				} 
            };
			
			vm.GetValue = function () {
				if(angular.isUndefined(vm.searchBy)){
					return;
				}else {
					if (vm.searchBy == "stateName") {
						vm.searchByStateName = vm.searchText;
						vm.searchByDistrictName = "";
					} else {
						vm.searchByDistrictName = vm.searchText;
						vm.searchByStateName = "";
					}
				}
            };
			
	}]);
})();
