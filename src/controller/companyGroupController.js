(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('companyGroupController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.companyGrpList = {};

            //Select
            vm.onSelectRow = function (rowData, rowNum) {
                if (vm.selected && vm.companyGrpList.name == rowData.companyGroup) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.companyGrpList = {};
                    vm.companyGrp = "";
                    vm.companyGrpId = "";

                } else {
                    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.companyGrpList.name = rowData.companyGroup;
                    vm.companyGrpList.id = rowData.id;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            //Search
            vm.search = function () {
                // vm.editScreen = false;
                vm.normalScreen = true;
vm.data=[];
                vm.hiddenColArr = ['id'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/companygroup/', 'GET', null).then(function (searchContent) {

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
                    "companyGroup": vm.companyGrp,

                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/companygroup/", "POST", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Company Group saved.";
            };


            //Save
            vm.save = function () {
                vm.editScreen = true;
                var reqobj = {
                    "companyGroup": vm.companyGrp,
                    "id": vm.companyGrpId
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/companygroup/", "PUT", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Company Group saved.";
            };
            //Reset
            vm.reset = function () {
                vm.companyGrpList = {};
                vm.companyGrp = "";
                vm.selected = false;
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
                vm.search();
				
            };


            //Confirm 
            vm.confirm = function () {
                if (confirm("Do you want to Delete?")) {
                    vm.delete();
                } else {
                    vm.errorMessage = "";
                }
            }


            //Delete
            vm.delete = function () {

                var reqobj = {
                    "id": 2
                };
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/companygroup/" + vm.companyGrpList.id, "DELETE", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Company Group Deleted.";

            };

            //Edit 
            vm.edit = function () {
                vm.companyGrp = vm.companyGrpList.name;

                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };
            vm.search();

            vm.autoCapitalize = function (val) {
                vm.companyGrp = val.toUpperCase();
            };


    }]);
})();
