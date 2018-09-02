angular.module('com.synectiks.eskaySoft')
  .factory('commonLoaderService', ['$q', '$resource', '$sessionStorage', function($q, $resource, $sessionStorage) {
    'use strict';
        return {
          load_Data: function(parameter, endPointUrl, methodType, requestObject) {
            var rs;
            var defer = $q.defer();
            rs = defer.promise;
			var authToken = $sessionStorage.authToken;
			var headers = {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Authorization':authToken,
				'Content-Type':'application/json'
			};
	
		
            var serviceAPI = $resource(endPointUrl, {}, {
              query: {
				headers:headers,
                method: methodType,
                requestObject: requestObject,
				isArray: methodType == "GET" ? true : false
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
