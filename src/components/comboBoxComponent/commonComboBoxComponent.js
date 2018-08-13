(function () {

    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .component('commonComboBoxComponent', {
            templateUrl: 'public/templates/commonComboBox.tpl.html',
            bindings: {
                filterOptions: '=',
                gridData: '=', // twoway binding
                gridCallBack: '&',
                rowNumber: '=',
                hiddenColumnKeys: '=',
                noOfViewColumns: '='
            },
            controller: 'commonComboBoxController',
            controllerAs: 'vm'
        });
})();
