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
      
    }]);
})();
