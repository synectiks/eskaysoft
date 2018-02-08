/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .controller('commonGridController', ['$scope', function ($scope) {

            var vm = this; // jshint ignore:line
            vm.startsWith = function (actual, expected) {
                var lowerStr = (actual + "").toLowerCase();
                return lowerStr.indexOf(expected.toLowerCase()) === 0;
            }
            $(document).ready(function () {
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


                if ($("th:first-child").width() > $("td:first-child").width()) {
                    $('thead').css('overflow-y', 'scroll');
                } else {
                    $('thead').css('overflow-y', 'hidden');
                }

            });

    }]);
})();
