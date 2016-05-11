'use strict';

/* Services */

var jsonTest = angular.module('mapGeoJSONService', ['ngResource']);

//FRC Sections Level 1 data services
jsonTest.factory('testService', ['$resource', '$http',
    function($resource,$http) {
        var config = {
            headers: {
                'api-key':'x1EBGabWogDOPfCcEPXj1vp4XeHZ7lLh'
            }
        };
        // var queryDataFunc = function() {
        //     var dataResource = $resource('json/abc.json', {}, {
        //         'query': {
        //             method: 'GET',
        //             isArray: false
        //         }
        //     });
        //     return dataResource;
        // };
        var queryDataFunc = function() {
            return $http.get('https://api.data.gov.sg/v1/transport/taxi-availability', config);
        };
        return {
            queryData: queryDataFunc
        };
    }
]);