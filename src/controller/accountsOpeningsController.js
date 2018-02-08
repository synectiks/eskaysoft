(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('accountsOpeningsController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line
            commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                vm.accountOpeningsTableHeaders = headers.accountsOpeningsTable;
            }, function (error) { // jshint ignore:line
                console.log("error", error);
            });
            /*common methods*/
            $(function () {
                var colCount = 0;
                $('tr:nth-child(1) th').each(function () {
                    if ($(this).attr('colspan')) {
                        colCount += +$(this).attr('colspan');
                    } else {
                        colCount++;
                    }
                });
                $('th').css('width', 100 / colCount + '%');
                $('td').css('width', 100 / colCount + '%');
            });
            $(function () {
                if ($("th:first-child").width() > $("td:first-child").width()) {
                    $('thead').css('overflow-y', 'scroll');
                } else {
                    $('thead').css('overflow-y', 'hidden');
                }

            });
    }])

})();
