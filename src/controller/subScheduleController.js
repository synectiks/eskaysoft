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
							tempSubScheduleData.scheduleId= item.schedule.id;
							tempSubScheduleData.scheduleName= item.schedule.scheduleName;
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
			
			vm.getScheduleNameArr();
            vm.search();
            
     }]);
})();