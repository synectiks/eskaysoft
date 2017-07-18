/**
 * Created by semianchuk on 08.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .service('mainService', [ function () {

        var thisIsPrivate = "mainService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

    }]);
})();
