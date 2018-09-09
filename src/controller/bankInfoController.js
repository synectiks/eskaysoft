(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('bankInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.bankInfoList = {};

            //Select
            vm.onSelectRow = function (rowData, rowNum) {

                if (vm.selected && vm.bankInfoList.name == rowData.name) {
                    vm.bankName = "";
                    vm.bankAddress = "";
                    vm.selectedRow = -1;
                    vm.bankInfoList = {};
                    vm.bankId = "";

                } else {
                    vm.selected = true;
					if(!vm.editScreen){
						vm.selectedRow = rowNum;
						vm.bankInfoList.name = rowData.name;
						vm.bankInfoList.address = rowData.address;
						vm.bankInfoList.bankId = rowData.id;
					}
 
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            vm.search = function () {
                // vm.editScreen = false;
                vm.normalScreen = true;
vm.data=[];
                vm.hiddenColArr = ['id'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/bankinformation/', 'GET', null).then(function (searchContent) {

                    if (searchContent.length > 0) {
                        var jsonKeys = Object.keys(searchContent[0])
                        vm.noOfViewColumns = jsonKeys.length - vm.hiddenColArr.length;

                        vm.data = searchContent;
                        vm.selectedName = "";
                        vm.messageContainer = false;
                        vm.errorMessage = "";
                        //vm.retrieveAllScheduleIndexs();
                    }

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            //Create
            vm.create = function () {
                var reqobj = {
                    "name": vm.bankName,
                    "address": vm.bankAddress
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/bankinformation/", "POST", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Bank Information saved.";
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
                    "name": vm.bankName,
                    "address": vm.bankAddress,
                    "id": vm.bankId

                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/bankinformation/", "PUT", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
              
                vm.messageContainer = true;
                vm.errorMessage = "Bank Information saved.";
            };
            //Reset
            vm.reset = function () {
                vm.bankInfoList = {};
                vm.bankName = "";
                vm.bankAddress = "";
                vm.bankId = "";

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
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/bankinformation/" + vm.bankInfoList.bankId, "DELETE", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Bank Information Deleted.";
            };

            //Edit 
            vm.edit = function () {

                vm.bankName = vm.bankInfoList.name;
                vm.bankAddress = vm.bankInfoList.address;

                vm.bankId = vm.bankInfoList.bankId;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };

            vm.search();

            vm.autoCapitalize = function (val) {
                vm.bankName = val.toUpperCase();
            };
    }]);

})();
