(function() {

 'use strict';
angular.module('com.synectiks.eskaySoft')
   .component('mainBanner', {
       controller: function () {
          this.label = 'This is Component'
       },
       templateUrl: 'src/components/mainBanner/mainBanner.tpl.html'
   });
})();
