(function () {
    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('districtsInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line
            vm.data = [];
            vm.stateName = "0";
			vm.statesDataArr=[];
            
            vm.getStates = function(){
				commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/states/', 'GET', null).then(function (statesData) {
					angular.forEach(statesData, function(item){
						var stateObj={};
						stateObj.id =item.id;
						stateObj.stateName =item.stateName;
						vm.statesDataArr.push(stateObj);
					});
				}, function (error) { // jshint ignore:line
				console.log("error", error);
                });
			};
			
             vm.search = function () {
                vm.normalScreen = true;
				vm.hiddenColArr=['districtId', 'states'];
		        commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/districts/', 'GET', null).then(function (searchContent) {
					if(searchContent.length>0){
						var jsonKeys = Object.keys(searchContent[0]);
						console.log("jsonKeys--", jsonKeys);
						vm.noOfViewColumns = jsonKeys.length-vm.hiddenColArr.length;
						console.log("vm.noOfViewColumns--", vm.noOfViewColumns);
						vm.data = searchContent;
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
                    "statesId": vm.stateName
                };
				commonLoaderService.load_Data(reqobj, "https://eskaysoft.synectiks.com/api/v1/districts/", "POST", null).then(function(data) {
				vm.getStates();
				vm.search();
				 }, function (error) { // jshint ignore:line
				console.log("error", error);
                });
                vm.messageContainer = true;
                vm.errorMessage = "Schedule saved.";
            };
			
			vm.getStates();
            vm.search();



	}]);
})();
