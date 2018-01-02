/**
 * Created by semianchuk on 08.10.16.
 */
(function () {

    'use strict';

    angular.module('com.synectiks.eskaySoft')
        .config(['$locationProvider', 'eskaySoftTranslateProvider', 'eskaySoftRouterProvider', function ($locationProvider, eskaySoftTranslateProvider, eskaySoftRouterProvider ) {
            $locationProvider.html5Mode(true);
			var translateConfig={
				 resourceUrl: 'messages/',
                        language: 'en',
                        fallBackLanguage: 'en',
                        features: ['eskaysoftConstants']
			};
			eskaySoftTranslateProvider.setTranslateConfig(translateConfig);
			eskaySoftRouterProvider.setStateConfig();
	       }]);
})();
