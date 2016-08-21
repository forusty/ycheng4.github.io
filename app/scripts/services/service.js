'use strict';

/* Services */

var jsonTest = angular.module('mapGeoJSONService', ['ngResource']);

//FRC Sections Level 1 data services
jsonTest.factory('testService', ['$resource', '$http',
    function($resource, $http) {
        var config = {
            headers: {
                'api-key': 'your key here'
            }
        };
        var data={};
        var queryKMLDataFunc = function() {
            var dataResource = $resource('json/abc.kml', {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                }
            });
            return dataResource;
        };
        var queryDataFunc = function() {
            return $http.get('https://api.data.gov.sg/v1/transport/taxi-availability', config);
        };
        return {
            queryDataKML:queryKMLDataFunc,
            queryData: queryDataFunc,
            setData: function(incomingData) {
                data=incomingData;
            },
            getData: function() {
                return data;
            }
        };
    }
]);