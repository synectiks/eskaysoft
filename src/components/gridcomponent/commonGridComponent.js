(function() {

 'use strict';
angular.module('com.synectiks.eskaySoft')
   .component('commonGridComponent', {
       templateUrl: 'public/templates/commonGridComponent.tpl.html',
	   bindings: {
			filterOptions: '=', 
			gridData: '=',// twoway binding
			gridCallBack: '&',
			rowNumber: '=',
			hiddenColumnKeys: '='
		  },
		controller: 'commonGridController',
		controllerAs:'vm'
   });
})();