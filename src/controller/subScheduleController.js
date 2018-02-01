(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('subScheduleController', ['$scope', 'commonLoaderService', function ($scope, commonLoaderService) {
            var vm = this; // jshint ignore:line
			
			commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
				vm.subScheduleTableHeaders=headers.subScheduleTable;
			}, function (error) { // jshint ignore:line
				console.log("error", error);
			});
     }]);
})();
