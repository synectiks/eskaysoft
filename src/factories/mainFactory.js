/**
 * Created by semianchuk on 08.10.16.
 */
 

(function () {
    "use strict";

    angular.module('com.synectiks.eskaySoft').factory('utils', utils);

    utils.$inject = ['$http', '$q', '$parse', '$log'];

    function utils($http, $q, $parse, $log) {
        var factory = {};

        factory.getValuePromise = function (value, rawValue, valueEndPoint) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            if (value) {
                deferred.resolve({"data": value});
            } else if (rawValue) {
                var data = null;
                try {
                    data = $parse(rawValue)();
                    if (_.isPlainObject(data)) {
                        deferred.resolve({"data": data});
                    }
                }
                catch (err) {
                    $log.debug("Raw value rejected :", err);
                    deferred.reject();
                }
            } else if (valueEndPoint) {
                promise = $http.get(valueEndPoint);
            } else {
                $log.debug("Value not valid");
                deferred.reject();
            }
            return promise;
        };

        return factory;
    }
}());