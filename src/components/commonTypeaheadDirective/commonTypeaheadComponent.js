

(function () {

    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .component('commonTypeaheadComponent', {
			
            templateUrl: 'public/templates/commonComboBox.tpl.html',
            bindings: {
                typeaheadList: '=',
				typeaheadModel: '=',
				typeaheadValue:'=',
				typeaheadOnSelect:'&?'
            },
            controller: 'TypeaheadCtrl',
            controllerAs: 'vm'
        });
})();