(function () {
    'use strict';
    angular.module('com.synectiks.eskaySoft')
        .controller('areasInfoController', ['commonLoaderService', function (commonLoaderService) {
            var vm = this; // jshint ignore:line
         /*   commonLoaderService.load_Data(null, 'messages/gridHeaders.json', 'GET', null).then(function (headers) {
                vm.areaTableHeaders = headers.areaTable;
            }, function (error) { // jshint ignore:line
                console.log("error", error);
            });*/
            
               vm.search = function () {
               // vm.editScreen = false;
                vm.normalScreen = true;
				/* commonLoaderService.load_Data(null, 'messages/scheduleMockData.json', 'GET', null).then(function (headers) {
                    vm.data = headers[0].SearchSchemeCodes;
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });*/
				vm.hiddenColArr=['id'];
		        commonLoaderService.load_Data(null, 'https://eskaysoft.synectiks.com/api/v1/area/', 'GET', null).then(function (searchContent) {
                    console.log(searchContent);
					if(searchContent.length>0){
						var jsonKeys = Object.keys(searchContent[0])
					vm.noOfViewColumns = jsonKeys.length-vm.hiddenColArr.length;
					
				/*	angular.forEach(searchContent, function(item){
						var hasScheduleType= false;
						angular.forEach(vm.scheduleTypes, function(scheduleTypeObj){
							if(!hasScheduleType && angular.equals(item.scheduleType, scheduleTypeObj.code) ){
								item.scheduleType = scheduleTypeObj.description;
								hasScheduleType=true
							}
						});
					});*/
					
					vm.data = searchContent;
					vm.selectedName = "";
                    vm.messageContainer = false;
                    vm.errorMessage = "";
					//vm.retrieveAllScheduleIndexs();
					}
					
                }, function (error) { // jshint ignore:line
                    console.log("error", error);
                });
            };
             vm.search();
	}])
/*    common methods
    $(document).ready(function () {
        var colCount = 0;
        $('tr:nth-child(1) th').each(function () {
            if ($(this).attr('colspan')) {
                colCount += +$(this).attr('colspan');
            } else {
                colCount++;
            }
        });
        $('th').css('width', 100 / colCount + '%');
        $('td').css('width', 100 / colCount + '%');

        if ($("th:first-child").width() > $("td:first-child").width()) {
            $('thead').css('overflow-y', 'scroll');
        } else {
            $('thead').css('overflow-y', 'hidden');
        }

    });*/
})();
