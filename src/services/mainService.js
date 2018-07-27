angular.module('com.synectiks.eskaySoft')
  .factory('commonLoaderService', ['$q', '$resource', function($q, $resource) {
    'use strict';
        return {
          load_Data: function(parameter, endPointUrl, methodType, requestObject) {
            var rs;
            var defer = $q.defer();
            rs = defer.promise;
			var headers = {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
				'Access-Control-Allow-Headers': 'Content-Type'
			};
            var serviceAPI = $resource(endPointUrl, {}, {
              query: {
                method: methodType,
                requestObject: requestObject,
				isArray:methodType !== "DELETE" ? true : false,
              }
            });
            var node = "";
            node = serviceAPI.query(parameter);
            node.$promise.then(function(data) {
              defer.resolve(data);
            });
            node.$promise.catch(function(error) {
              defer.reject(error);
            });
            return rs;
          }
        };
  }]);
