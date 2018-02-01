(function () {
    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('statesInfoController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {
            var vm = this; // jshint ignore:line
			commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
				vm.stateTableHeaders=headers.stateTable;
			}, function (error) { // jshint ignore:line
				console.log("error", error);
			});
    }]);
})();
