(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('businessExeInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line
            commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                vm.businessExecutivesTableHeaders = headers.businessExecutivesTable;
            }, function (error) { // jshint ignore:line
                console.log("error", error);
            });
            
           vm.search = function () {
               // vm.editScreen = false;
                vm.normalScreen = true;
				/* commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (headers) {
                    vm.data = headers[0].SearchSchemeCodes;
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });*/
				vm.hiddenColArr=['businessexecutiveid'];
		        commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/businessexecutive/', 'GET', null).then(function (searchContent) {
                    console.log(searchContent);
					if(searchContent.length>0){
						var jsonKeys = Object.keys(searchContent[0])
					vm.noOfViewColumns = jsonKeys.length-vm.hiddenColArr.length;
					
				/*	angular.forEach(searchContent, function(item){
						var hasScheduleType= false;
						angular.forEach(vm.scheduleTypes, function(scheduleTypeObj){
							if(!hasScheduleType && angular.equals(item.scheduleType, scheduleTypeObj.code) ){
								item.scheduleType = scheduleTypeObj.description;
								hasScheduleType=true
							}
						});
					});*/
					
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
             vm.search();
	}]);
})();
