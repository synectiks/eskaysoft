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
	}]);
})();
