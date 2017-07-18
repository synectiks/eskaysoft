/**
 * Created by semianchuk on 08.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .factory('mainFactory', [ function () {

        var thisIsPrivate = "mainFactory";

        function getPrivate() {
            return thisIsPrivate;
        }

        return {
            getPrivate: getPrivate
        };
    }]);
})();
