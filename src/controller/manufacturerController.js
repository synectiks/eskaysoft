(function () {
    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('manufacturerController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.manufacInfoList = {};

            //Select
            vm.onSelectRow = function (rowData, rowNum) {
                if (vm.selected && vm.manufacInfoList.name == rowData.manfacturerName) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.manufacInfoList = {};
                    vm.manufacName = "";
                    vm.manufacId = "";

                } else {
                    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.manufacInfoList.name = rowData.manfacturerName;
                    vm.manufacInfoList.id = rowData.id;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            //Search
            vm.search = function () {
                // vm.editScreen = false;
                vm.normalScreen = true;

                vm.hiddenColArr = ['id'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/manfacturer/', 'GET', null).then(function (searchContent) {
                    console.log(searchContent);
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
                    "manfacturerName": vm.manufacName,

                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/manfacturer/", "POST", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "Manfacturer Name saved.";
            };

            //Reset
            vm.reset = function () {
                vm.manufacInfoList = {};
                vm.manufacName = "";
                vm.selected = false;
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.manufacId = "";
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

            //Save
            vm.save = function () {
                vm.editScreen = true;
                var reqobj = {
                    "manfacturerName": vm.manufacName,
                    "id": vm.manufacId
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/manfacturer/", "PUT", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.search();
                vm.messageContainer = true;
                vm.errorMessage = "Manufacturer saved.";
            };
            //Delete
            vm.delete = function () {

                var reqobj = {
                    "id": 2
                };
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/manfacturer/" + vm.manufacInfoList.id, "DELETE", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Manufacturer Deleted.";
            };

            //Edit 
            vm.edit = function () {
                vm.manufacName = vm.manufacInfoList.name;
                vm.manufacId = vm.manufacInfoList.id
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };
            vm.search();

    }]);
})();
