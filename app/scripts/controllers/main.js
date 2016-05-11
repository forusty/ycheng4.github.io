'use strict';
/**
 * @ngdoc function
 * @name wheresmytaxiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wheresmytaxiApp
 */

angular.module('wheresmytaxiApp')
    .controller('MainCtrl', function(testService) {
        testService.queryData()
            .success(function(response) {
                console.log(response);
                var heatmapData = [];
                angular.forEach(response.features[0].geometry.coordinates, function(value) {
                    heatmapData.push(new google.maps.LatLng(value[1], value[0]));
                });
                console.log(heatmapData);
                var mapDiv = document.getElementById('map');
                var map = new google.maps.Map(mapDiv, {
                    center: {
                        lat: 1.3521,
                        lng: 103.8198
                    },
                    zoom: 11
                });
                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData
                });
                heatmap.setMap(map);
            })
            .error(function(response, status) {
                alert('Unable to load');
                console.log(response);
                console.log(status);
                console.log(status);
            });
    });
