'use strict';
/**
 * @ngdoc function
 * @name wheresmytaxiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wheresmytaxiApp
 */
angular.module('wheresmytaxiApp')
    .controller('MainCtrl', function($scope, testService) {
        var map = '';
        var heatmap = '';
        $scope.currentMode = '';

        testService.queryData()
            .success(function(response) {
                console.log(response);
                testService.setData(response);
                $scope.currentMode = 'datapoint';

                var mapDiv = document.getElementById('map');
                map = new google.maps.Map(mapDiv, {
                    center: {
                        lat: 1.3521,
                        lng: 103.8198
                    },
                    zoom: 11
                });
                // map.data.addGeoJson(response);
                    // web service successCallback
                    var ctaLayer = new google.maps.KmlLayer({
                        url: 'abc.kml',
                        map: map
                    });
            })
            .error(function(response, status) {
                console.log(response);
                console.log(status);
                console.log(status);
            });
        $scope.submit = function() {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': $scope.geoCode
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(18);
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        };
        $scope.heatMap = function() {
            $scope.currentMode = 'heatmap';
            console.log();
            if (typeof(heatmap) !== 'string') {
                heatmap.setMap(null);
            }
            map.data.forEach(function(feature) {
                //If you want, check here for some constraints.
                map.data.remove(feature);
            });
            //generate heat map data points into long,lat array
            var heatmapData = [];
            angular.forEach(testService.getData().features[0].geometry.coordinates, function(value) {
                heatmapData.push(new google.maps.LatLng(value[1], value[0]));
            });
            //define the heat map layer from goolge api and set the data to the generated array of heatmap points
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData
            });
            heatmap.setMap(map);
        };
        $scope.dataPoint = function() {
            $scope.currentMode = 'datapoint';
            if (typeof(heatmap) !== 'string') {
                heatmap.setMap(null);
            }
            map.data.forEach(function(feature) {
                //If you want, check here for some constraints.
                map.data.remove(feature);
            });
            map.data.addGeoJson(testService.getData());
        };
        $scope.refresh = function() {
            testService.queryData()
                .success(function(response) {
                    testService.setData(response);
                    console.log(response);
                    if ($scope.currentMode === 'heatmap') {
                        $scope.heatMap();
                    } else if ($scope.currentMode === 'datapoint') {
                        $scope.dataPoint();
                    }
                })
                .error(function(response, status) {
                    console.log(response);
                    console.log(status);
                    console.log(status);
                });
        };
    });