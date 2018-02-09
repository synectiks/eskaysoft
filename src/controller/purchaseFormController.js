(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('purchaseFormController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line

            $(".two-decimals").change(function () {
                this.value = parseFloat(this.value).toFixed(2);
            });

            commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                vm.purchaseDetailsTableHeaders = headers.purchaseDetailsTable;
                vm.purchaseSoftwareTableHeaders = headers.purchaseSoftwareTable;

            });
    }])

})();
