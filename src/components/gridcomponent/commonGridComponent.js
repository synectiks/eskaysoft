(function() {

 'use strict';
angular.module('com.synectiks.eskaySoft')
   .component('commonGridComponent', {
       templateUrl: 'public/templates/commonGridComponent.tpl.html',
	   bindings: {
			filterOptions: '=', 
			headersList: '<', // oneway binding
			gridData: '=',// twoway binding
			gridCallBack: '&',
			rowNumber: '='
		  },
		   controller: 'commonGridController',
			controllerAs:'vm'
   });
})();