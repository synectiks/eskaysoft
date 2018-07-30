(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('subScheduleController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {
            var vm = this; // jshint ignore:line
			vm.scheduleNameArr=[];
			vm.subScheduleIndexArr=[];

			vm.getScheduleNameArr = function () {
		        commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/schedules/', 'GET', null).then(function (scheduleData) {
					if(scheduleData.length>0){
						angular.forEach(scheduleData, function(item){
							var scheduleObj={};
							scheduleObj.scheduleId =item.id;
							scheduleObj.scheduleName =item.scheduleName;
							vm.scheduleNameArr.push(scheduleObj);
						});
					}
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };

	        vm.search = function () {
                vm.normalScreen = true;
				vm.hiddenColArr=['subScheduleId','scheduleId'];
		        commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/subschedules/', 'GET', null).then(function (searchContent) {
            		if(searchContent.length>0){
						vm.subScheduleDataArr=[];
						angular.forEach(searchContent, function(item){
							var tempSubScheduleData={};
							tempSubScheduleData.subScheduleId= item.subScheduleId;
							tempSubScheduleData.subScheduleName= item.subScheduleName;
							tempSubScheduleData.subScheduleIndex=item.subScheduleIndex;
							vm.subScheduleIndexArr.push(item.subScheduleIndex);
							
							angular.forEach(vm.scheduleNameArr, function(schObj){
								if(angular.equals(item.scheduleId, schObj.scheduleId) ){
									tempSubScheduleData.scheduleId= item.scheduleId;
									tempSubScheduleData.scheduleName= schObj.scheduleName;
								}
							});
							
							vm.subScheduleDataArr.push(tempSubScheduleData);
						});
						
						var jsonKeys = Object.keys(vm.subScheduleDataArr[0])
						vm.noOfViewColumns = jsonKeys.length-vm.hiddenColArr.length;
						vm.selectedName = "";
						vm.messageContainer = false;
						vm.errorMessage = "";
					}
				}, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };
			
			vm.validateSubSchIndex=function(){
				angular.forEach(vm.subScheduleIndexArr, function(scheduleIndex){
					if(angular.equals(vm.scheduleNo, scheduleIndex) ){
						 vm.errorMessage = "duplicate";
					}
				});
			};
			
			vm.create = function () {
                var reqobj = {
                    "subScheduleName": vm.subScheduleName,
                    "subScheduleIndex": vm.subScheduleIndex,
                    "scheduleId": vm.scheduleNameValue
                };
				commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/subschedules/", "POST", null).then(function(data) {
				vm.getScheduleNameArr();
				vm.search();
				 }, function (error) { // jshint ignore:line
				console.log("error", error);
                });
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };
			vm.subScheduleList={};
			
			vm.onSelectRow = function (rowData, rowNum) {
				
                if (vm.selected && vm.subScheduleList.name == rowData.subScheduleName) {
				    vm.selectedName = null;
                    vm.selected = false;
                    vm.selectedRow = -1;
					vm.subScheduleList={};
                    vm.subScheduleName = "";
                    vm.scheduleNameValue = "0";
                    vm.subScheduleIndex = "";
                    vm.scheduleId= "";
					
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
			
			vm.edit = function () {
				vm.subScheduleName = vm.subScheduleList.subScheduleName;
                vm.subScheduleIndex = vm.subScheduleList.subScheduleIndex;
				
				var hasRecord= false;
				angular.forEach(vm.scheduleNameArr, function(scheduleNameObj){
					if(!hasRecord && angular.equals(vm.subScheduleList.scheduleId, scheduleNameObj.scheduleId) ){
						vm.scheduleNameValue=scheduleNameObj.scheduleId;
						hasRecord=true;
					}
				});
             
			  // vm.scheduleNameValue=vm.subScheduleList.scheduleId;
                vm.editScreen = true;
                vm.normalScreen = false;
                vm.messageContainer = false;
                vm.errorMessage = "";
            };
			
			vm.save = function () {
				vm.editScreen = true;
    		    var reqobj = {
                    "subScheduleName": vm.subScheduleName,
                    "subScheduleIndex": vm.subScheduleIndex,
                    "scheduleId": vm.subScheduleList.scheduleId,
					"subScheduleId": vm.subScheduleList.subScheduleId
                };
				console.log(reqobj);
				commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/subschedules/", "PUT", null).then(function(data) {
					vm.getScheduleNameArr();
					vm.search();
				}, function (error) { // jshint ignore:line
					console.log("error", error);
                });
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };
			
			vm.getScheduleNameArr();
            vm.search();
            
     }]);
})();