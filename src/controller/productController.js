(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('productController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

		commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
			vm.productTableHeaders=headers.productTable;
		}, function (error) { // jshint ignore:line
			console.log("error", error);
		});
		vm.GetValue = function () {
			if (vm.searchBy == "group") {
				vm.searchByExecutives = "";
				vm.searchByGroup = vm.searchText;
				vm.searchByCategory = "";
				vm.searchByCompany = "";
			} else if (vm.searchBy == "category") {
				vm.searchByExecutives = "";
				vm.searchByGroup = "";
				vm.searchByCategory = vm.searchText;
				vm.searchByCompany = "";
			} else if (vm.searchBy == "executiveName") {
				vm.searchByExecutives = vm.searchText;
				vm.searchByGroup = "";
				vm.searchByCategory = "";
				vm.searchByCompany = "";
			} else {
				vm.searchByExecutives = "";
				vm.searchByGroup = "";
				vm.searchByCategory = "";
				vm.searchByCompany = vm.searchText;
			}
		};
		
    }]);
})();
