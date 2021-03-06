/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('scheduleController', [ 'commonLoaderService', function ( commonLoaderService) {
			
            var vm = this; // jshint ignore:line
			vm.typeaheadSelected=null;
            vm.selected = false;
            vm.normalScreen = true;
            vm.messageContainer = false;
            vm.scheduleList = {};
            vm.scheduleIndexArr = [];
            vm.prevScheduleIndex = "";
			vm.typeaheadStaticValue= "Schedule";
			
            vm.onSelectRow = function (rowData, rowNum) {
				console.log("vm.editScreen", vm.editScreen)
                if (vm.selected && vm.scheduleList.name == rowData.scheduleName) {
					console.log("vm.editScriieen", vm.editScreen)
                    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
                    vm.scheduleList = {};
                    vm.scheduleName = "";
                    vm.scheduleNo = "";
					vm.typeaheadSelected=null;
					vm.editScreen = false;

                } else {
                    vm.selected = true;
					if(!vm.editScreen){
						vm.selectedRow = rowNum;
						vm.scheduleList.name = rowData.scheduleName;
						vm.scheduleList.no = rowData.id;
						vm.scheduleList.type = rowData.scheduleType;
						vm.scheduleList.index = rowData.scheduleIndex;
					}
                    vm.messageContainer = false;
                    vm.errorMessage = "";
                }
            };

            vm.getDropDownValues = function () {
				 vm.scheduleTypes=[];
                commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (dropDownContent) {
                    vm.scheduleTypes = dropDownContent[0].scheduleTypes;
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.retrieveAllScheduleIndexs = function () {
                vm.scheduleIndexList = [];
                commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/schedulesIndexs', 'GET', null).then(function (searchContent) {
                    vm.scheduleIndexList = searchContent;

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

            vm.search = function () {
                vm.normalScreen = true;
                vm.hiddenColArr = ['id'];
                vm.data = [];
				//
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
						vm.typeaheadSelected =  {"code":scheduleTypeObj.code,"description":scheduleTypeObj.description};
                        hasRecord = true
                    }
                });
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };

            //Save
            vm.save = function () {
               
                var reqobj = {
                    "scheduleName": vm.scheduleName,
                    "scheduleIndex": vm.scheduleNo,
                    "scheduleType": vm.typeaheadSelected.code,
                    "id": vm.scheduleList.no
                };
                commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/schedules/", "PUT", null).then(function (data) {
					vm.reset();

                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });

                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };

            //Confirm 
            vm.confirm = function () {
                if (confirm("Do you want to Delete the Schedule?")) {
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
                commonLoaderService.load_Data(null, "https://eskaysoft.synectiks.com/api/v1/schedules/" + vm.scheduleList.no, "DELETE", null).then(function (data) {
                    vm.reset();
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
                vm.selected = false;
                vm.messageContainer = true;
                vm.errorMessage = "Schedule Deleted.";

            };

			vm.SelectedTypeahead = function(data){
				console.log("--", vm.typeaheadSelected);
				console.log("--", data);
			};
			
            vm.create = function () {
				var reqobj = {
				"scheduleName": vm.scheduleName,
				"scheduleIndex": vm.scheduleNo,
				"scheduleType": vm.typeaheadSelected.code
				};
				commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/schedules/", "POST", null).then(function (data) {
					vm.reset();
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
                vm.selected = false;
                vm.scheduleNo = "";
                vm.selectedName = "";
                vm.selectedRow = -1;
                vm.messageContainer = false;
                vm.editScreen = false;
				vm.searchBy="";
				vm.searchText="";
				vm.searchTextType="";
				vm.searchTextName="";
				vm.typeaheadSelected=null;
                vm.search();
            };

            vm.GetValue = function () {
				
				if(angular.isUndefined(vm.searchBy)){
					return;
				}
				else{
					if (vm.searchBy == "scheduleType") {
						vm.searchTextType = vm.searchText;
						vm.searchTextName = "";
					} else {
						vm.searchTextName = vm.searchText;
						vm.searchTextType = "";
					}
				}
                

            };
			
            vm.autoCapitalize = function (val) {
                vm.scheduleName = val.toUpperCase();
            };

            vm.getDropDownValues();
            vm.search();
			//vm.typeaheadSelected =  {"code":"LIA","description":"Liabilities"};
			
	}]);

})();
