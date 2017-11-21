(function() {

 'use strict';
angular.module('com.synectiks.eskaySoft')
   .component('headerMenuBar', {
       controller: function () {
          this.label = 'This is Component'
       },
       templateUrl: 'public/templates/headerMenuBar.tpl.html'
   });
})();
