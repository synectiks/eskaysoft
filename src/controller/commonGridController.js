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
                vm.gridAlign();
                return lowerStr.indexOf(expected.toLowerCase()) === 0;
            }

            vm.containsColumnHiddenKey = function (hiddenKey) {

                var tempArr = vm.hiddenColumnKeys;
                var isTrue = false;
                angular.forEach(tempArr, function (item) {
                    if (!isTrue && angular.equals(hiddenKey, item)) {
                        tempArr.slice(tempArr, 1);
                        isTrue = true;
                    }
                });

                return isTrue;
            };

            var toalColLen = -1;
            vm.gridAlign = function () {

                if (toalColLen == -1) {
                    toalColLen = vm.noOfViewColumns;
                }
                $('th').css('width', 100 / vm.noOfViewColumns + '%');
                $('td').css('width', 100 / vm.noOfViewColumns + '%');
            };

            vm.sort = {
                /*column: "scheduleName",*/
                descending: false
            };
            vm.selectedCls = function (column) {
                if (vm.sort.descending) {
                    return column == vm.sort.column && 'fa-sort-down';
                } else {
                    return column == vm.sort.column && 'fa-sort-up';
                }
                return column == vm.sort.column && 'sort-' + vm.sort.descending;
            };
            vm.changeSorting = function (column) {
                var sort = vm.sort;
                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };

                    }]);
})();
