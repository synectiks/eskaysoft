/**
 * Created by semianchuk on 08.10.16.
 */
 

(function () {
    "use strict";

  angular.module('com.synectiks.eskaySoft').factory('commonFactory', function () {

    var authToken = {
			value: ''
		};

    return {
       getAuthToken: function () {
            return authToken.value;
        },
        setAuthToken: function (accessToken) {
            authToken.value = "Bearer "+accessToken;
        }
    };
});
}());