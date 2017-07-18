/**
 * Created by semianchuk on 11.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .component('firstComponent', {
        controller: function () {
           this.label = 'This is Component'
        },
        templateUrl: 'src/components/firstcomponent/index.html'
    });
})();
