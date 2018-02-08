(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('purchaseFormController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                vm.purchaseDetailsTableHeaders = headers.purchaseDetailsTable;
                vm.purchaseSoftwareTableHeaders = headers.purchaseSoftwareTable;

            });

    }])

})();
