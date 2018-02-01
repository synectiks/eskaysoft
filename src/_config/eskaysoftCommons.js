/**
 * Created by vijay kesanupalli on 08.10.16.
 * eskaysoftCommons
 */

/**
 * @ngdoc overview
 * @name statesListProvider
 *
 * @description
 * Documentation for statesListProvider provider, to configure eskaysoft states
 */
/**
 * @ngdoc overview
 * @name MyInsuranceTranslate
 *
 * @description
 * Documentation for MyInsuranceTranslate provider, to configure my insurance resource bundles
 */
(function () {
    "use strict";
    angular.module('com.synectiks.eskaySoft')
        .provider("eskaySoftTranslate", ["$translateProvider",
		function ($translateProvider) {
                var translateConfig = {
                    resourceUrl: '',
                    language: 'en',
                    fallBackLanguage: 'en',
                    features: ['']
                };

                this.setTranslateConfig = function (aTranslateConfig) {
                    translateConfig = aTranslateConfig;
                    var staticFiles = [];
                    var language = aTranslateConfig.language || 'en';
                    var fallBackLanguage = aTranslateConfig.fallBackLanguage || 'en';
                    if (aTranslateConfig.features) {
                        for (var i = 0; i < aTranslateConfig.features.length; i++) {
                            var featureFile = aTranslateConfig.resourceUrl + "/" + aTranslateConfig.features[i] + "_";
                            staticFiles.push({
                                prefix: featureFile,
                                suffix: '.json'
                            });
                        }
                    }
                    $translateProvider.useStaticFilesLoader({
                        files: staticFiles
                    });

                    $translateProvider
                        .useSanitizeValueStrategy('sanitizeParameters')
                        .preferredLanguage(language)
                        .fallbackLanguage(fallBackLanguage);
                    $translateProvider.forceAsyncReload(true);
                };

                this.$get = [function () {
                    return $translateProvider;
				}];
		}]);
}());

/*
{
    name: 'accountsOpenings',
    url: '/accountsOpenings',
    templateUrl: 'public/templates/accountsOpenings.html',
    controller: 'accountsOpeningsController'
}, {
    name: 'customerwiseDiscount',
    url: '/customerwiseDiscount',
    templateUrl: 'public/templates/customerwiseDiscount.html',
    controller: 'customerwiseDiscountController'
},*/

(function () {
    "use strict";
    angular.module('com.synectiks.eskaySoft')
        .provider("eskaySoftRouter", ["$stateProvider",

		function ($stateProvider) {

                this.setStateConfig = function () {

                    var statesList = [
                        {
                            name: 'purchase',
                            url: '/purchaseForm',
                            templateUrl: 'public/templates/purchaseForm.html',
                            controller: 'purchaseFormController'
					}, {
                            name: 'accountsOpenings',
                            url: '/accountsOpenings',
                            templateUrl: 'public/templates/accountsOpenings.html',
                            controller: 'accountsOpeningsController'
					}, {
                            name: 'customerwiseDiscount',
                            url: '/customerwiseDiscount',
                            templateUrl: 'public/templates/customerwiseDiscount.html',
                            controller: 'customerwiseDiscountController'
					}, {
                            name: 'accountsInformation',
                            url: '/accountsInformation',
                            templateUrl: 'public/templates/accountsInformation.tbl.html',
                            controller: 'accountsInformationController'
					}, {
                            name: 'home',
                            url: '/',
                            templateUrl: 'public/templates/login.html',
                            controller: 'loginInfoController'
					}, {
                            name: 'schedule',
                            url: '/schedule',
                            templateUrl: 'public/templates/schedule.html',
                            controller: 'scheduleController'
					}, {
                            name: 'statesInfo',
                            url: '/statesInfo',
                            templateUrl: 'public/templates/statesInfo.html',
                            controller: 'statesInfoController'
					}, {
                            name: 'bankInfo',
                            url: '/bankInfo',
                            templateUrl: 'public/templates/bankInfo.html',
                            controller: 'bankInfoController',
                            controllerAs: 'vm'
					}, {
                            name: 'districtsInfo',
                            url: '/districtsInfo',
                            templateUrl: 'public/templates/districtsInfo.html',
                            controller: 'districtsInfoController'
					}, {
                            name: 'businessExeInfo',
                            url: '/businessExeInfo',
                            templateUrl: 'public/templates/businessExeInfo.html',
                            controller: 'businessExeInfoController'
					}, {
                            name: 'areasInfo',
                            url: '/areasInfo',
                            templateUrl: 'public/templates/areasInfo.html',
                            controller: 'areasInfoController'
					}, {
                            name: 'login',
                            url: '/login',
                            templateUrl: 'public/templates/login.html',
                            controller: 'loginInfoController'
					}, {
                            name: 'contact',
                            url: '/contact',
                            templateUrl: 'public/templates/contact.html',
                            controller: 'contactController'
					}, {
                            name: 'component',
                            url: '/component',
                            templateUrl: 'public/templates/component.html',
                            controller: ''
					}, {
                            name: 'module',
                            url: '/module',
                            templateUrl: 'public/templates/newmodule.html',
                            controller: ''
					}, {
                            name: 'provider',
                            url: '/provider',
                            templateUrl: 'public/templates/provider.html',
                            controller: 'mainController'
					}, {
                            name: 'subschedule',
                            url: '/subschedule',
                            templateUrl: 'public/templates/subSchedules.html',
                            controller: 'subScheduleController'
					}, {
                            name: 'manufacturer',
                            url: '/manufacturer',
                            templateUrl: 'public/templates/manufacturer.html',
                            controller: 'manufacturerController'
					}, {
                            name: 'companyGroup',
                            url: '/companyGroup',
                            templateUrl: 'public/templates/companyGroup.html',
                            controller: 'companyGroupController'
					}, {
                            name: 'productGroup',
                            url: '/productGroup',
                            templateUrl: 'public/templates/productGroup.html',
                            controller: 'productGroupController'
					}, {
                            name: 'companies',
                            url: '/companies',
                            templateUrl: 'public/templates/companies.html',
                            controller: 'companiesController'
					}, {
                            name: 'productCategory',
                            url: '/productCategory',
                            templateUrl: 'public/templates/productCategory.html',
                            controller: 'productCategoryController'
					}, {
                            name: 'product',
                            url: '/product',
                            templateUrl: 'public/templates/product.html',
                            controller: 'productController'
					}
			];
                    angular.forEach(statesList, function (state) {
                        $stateProvider
                            .state(state.name, {
                                url: state.url,
                                templateUrl: state.templateUrl,
                                controller: state.controller,
                                controllerAs: 'vm'
                            });
                    });

                };

                this.$get = [function () {
                    return $stateProvider;
				}];
		}]);
}());
