
(function() {

    'use strict';

    angular
        .module('com.synectiks.eskaySoft')
        .directive('typeaheadShowOnFocus', function () {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            element.bind('focus', function () {
                ngModel.$setViewValue();
                $(element).trigger('input');
                $(element).trigger('change');
            });
        }
    };
});
})();