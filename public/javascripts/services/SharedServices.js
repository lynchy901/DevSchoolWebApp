//module here
var sharedServices = angular.module("sharedServices", []);

sharedServices.factory("ajaxService", function($http) {
    return {
        getRequest: function(url) {
            return $http.get(url);
        },
        postRequest: function(url, data) {
            return $http.post(url, data);
        }
    }
});