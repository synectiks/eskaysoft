/**
 * Created by semianchuk on 11.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .provider('mainProvider',[ function () {
        var privateVariable = 'mainProvider';

        return {
            $get: function() {
                function getPrivate() {
                    return privateVariable;
                }
                return {
                    getPrivate: getPrivate
                };
            }
        };
    }]);
})();
