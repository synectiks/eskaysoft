/**
 * Created by semianchuk on 08.10.16.
 */
 (function() {

  'use strict';


angular.module('com.synectiks.eskaySoft')
    .controller('contactController', [ '$scope', '$interval', function ($scope, $interval) {
      var vm = this; // jshint ignore:line
        vm.contactMe = {
            email  : 'fix20152@gmail.com',
            github : 'https://github.com/fix2015'
        }
        //initMap();
        //swaping images in regular time intervals
        // $interval(vm.src= function(){
        // var backgrounds=['public/ico/1.png','public/ico/2.png','public/ico/3.png','public/ico/4.png'];
        // var x = Math.floor(Math.random()*backgrounds.length);
        // var y= backgrounds[x];
        // return y;
        // }, 1000);
        //
        //including maps
        // NgMap.getMap().then(function(map) {
        //     console.log(map.getCenter());
        //     console.log('markers', map.markers);
        //     console.log('shapes', map.shapes);
        //   });
        //   vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBntghunooeas8P7ewEtvkURkE1BB9G0nE";
    }]);
})();
