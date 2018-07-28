(function () {
    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('districtsInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line
            vm.data = [];
            vm.stateName = "0";
            vm.stateobj = {
                "states": [{
                        "name": "Andhra Pradesh",
                        "description": ""
			}, {
                        "name": "Telangana",
                        "description": ""
			}
			]
            };

           /* commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                vm.districtTableHeaders = headers.districtTable;
                console.log("kkk", vm.districtTableHeaders);
            }, function (error) { // jshint ignore:line
                console.log("error", error);
            });

            vm.save = function () {
                var obj = {
                    "districtName": vm.districtName,
                    "stateName": vm.stateName
                };
                vm.data.push(obj);
                vm.reset();
                vm.messageContainer = true;
                vm.errorMessage = "District saved.";
            };

            vm.reset = function () {
                vm.districtName = "";
                vm.stateName = false;
                vm.messageContainer = false;
                vm.data = [];
            };
*/
            
             vm.search = function () {
               // vm.editScreen = false;
                vm.normalScreen = true;
				/* commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (headers) {
                    vm.data = headers[0].SearchSchemeCodes;
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });*/
				vm.hiddenColArr=['id','districtId'];
		        commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/districts/', 'GET', null).then(function (searchContent) {
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
