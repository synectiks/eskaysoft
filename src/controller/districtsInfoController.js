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

            commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
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




	}]);
})();
