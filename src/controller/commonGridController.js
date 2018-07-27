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
				
			vm.containsColumnHiddenKey = function(hiddenKey){
				
				var tempArr = vm.hiddenColumnKeys;
				var isTrue= false;
				angular.forEach(tempArr, function(item){
					if(!isTrue && angular.equals(hiddenKey, item)){
						tempArr.slice(tempArr, 1);
						isTrue=true;
					}
				});
			
				return isTrue;
			};

			var toalColLen = -1;
			vm.gridAlign = function () {
		      
			  if(toalColLen == -1){
				  toalColLen = vm.noOfViewColumns;
			  }
                $('th').css('width', 100 / vm.noOfViewColumns + '%');
                $('td').css('width', 100 / vm.noOfViewColumns + '%');

                /*if ($("th:first-child").width() > $("td:first-child").width()) {
                    $('thead').css('overflow-y', 'scroll');

                    if (screen.width > 1366) {
                        $('th').css('margin-right', '-1px');
                    }
                } else {
                    $('thead').css('overflow-y', 'hidden');
                    $('th').css('margin-right', '-0px');
                }*/

            };
			
	
			
            }]);
})();
