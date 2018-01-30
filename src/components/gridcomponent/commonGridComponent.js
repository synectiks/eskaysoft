(function() {

 'use strict';
angular.module('com.synectiks.eskaySoft')
   .component('commonGridComponent', {
       templateUrl: 'public/templates/commonGridComponent.tpl.html',
	   bindings: {
			options: '=', // twoway binding
			headersList: '<', // oneway binding
			gridData: '=',
			gridCallBack: '&'
		  },
		   controller: 'commonGridController',
			controllerAs:'vm'
   });
})();