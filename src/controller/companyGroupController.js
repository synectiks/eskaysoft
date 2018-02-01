(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('companyGroupController', ['commonLoaderService', function (commonLoaderService) {
        var vm = this; // jshint ignore:line
		commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
			vm.companyGroupTableHeaders=headers.companyGroupTable;
		}, function (error) { // jshint ignore:line
				console.log("error", error);
		});
    }]);
})();
