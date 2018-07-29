(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('businessExeInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.busExeInfoList = {};

            //Select
            vm.onSelectRow = function (rowData, rowNum) {
                if (vm.selected && vm.busExeInfoList.name == rowData.name) {
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.busExeInfoList = {};
                    vm.busExeName = "";
                    vm.busExeAddress = "";
                    vm.busExeTown = "";
                    vm.busExeMobile = "";
                    vm.busExeId = "";

                } else {
                    vm.selected = true;
                    vm.selectedRow = rowNum;
                    vm.busExeInfoList.name = rowData.name;
                    vm.busExeInfoList.address = rowData.address;
                    vm.busExeInfoList.town = rowData.town;
                    vm.busExeInfoList.mobile = rowData.mobile;
                    vm.busExeInfoList.id = rowData.businessexecutiveid;
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            //Search
            vm.search = function () {
                // vm.editScreen = false;
                vm.normalScreen = true;

                vm.hiddenColArr = ['businessexecutiveid'];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/businessexecutive/', 'GET', null).then(function (searchContent) {
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
                        "name": vm.busExeName,
                        "address": vm.busExeAddress,
                        "town": vm.busExeTown,
                        "mobile": vm.busExeMobile,
						
                    };
                    commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/businessexecutive/", "POST", null).then(function (data) {
                        vm.reset();
                    }, function (error) { // jshint ignore:line
                        console.log("error", error);
                    });
                    vm.messageContainer = true;
                    vm.errorMessage = "Business Executive Information saved.";
           
            };
            
            //Save
            vm.save = function () {
                vm.editScreen = true;
                    var reqobj = {
                        "name": vm.busExeName,
                        "address": vm.busExeAddress,
                        "town": vm.busExeTown,
                        "mobile": vm.busExeMobile,
                        "businessexecutiveid":vm.busExeId
                    };
                    commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/businessexecutive/", "PUT", null).then(function (data) {
                       vm.search();
                    }, function (error) { // jshint ignore:line
                        console.log("error", error);
                    });
                    vm.messageContainer = true;
                    vm.errorMessage = "Business Executive Information saved.";
            
            };

            //Reset
            vm.reset = function () {
                vm.busExeInfoList = {};
                vm.busExeName = "";
                vm.busExeAddress = "";
                vm.busExeTown = "";
                vm.busExeMobile = "";
				vm.busExeId ="";
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
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/businessexecutive/" + vm.busExeInfoList.id, "DELETE", null).then(function (data) {
                    vm.search();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Deleted.";
            };

            //Edit 
            vm.edit = function () {
                vm.busExeName = vm.busExeInfoList.name;
                vm.busExeAddress = vm.busExeInfoList.address;
                vm.busExeTown = vm.busExeInfoList.town;
                vm.busExeMobile = vm.busExeInfoList.mobile;
vm.busExeId = vm.busExeInfoList.id;

                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };
            vm.search();
                    }]);
})();
