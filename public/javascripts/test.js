/**
 * Created by Nathan.Lynch on 6/19/2017.
 */
function go() {

}

var app = angular.module("OTP", []);

app.controller("OTPCntl",['$scope', 'ajaxService', function($scope, ajaxService) {
   $scope.name;
   $scope.key;

   $scope.submitData = function() {
       var resultAndKey = ajaxService.postRequest("/users/test", {data:$scope.name});

       resultAndKey.then(function(response) {
           console.log(response);
       });
   }
}]);

app.factory("ajaxService", function($http) {
    return {
        getRequest: function(url) {
            return $http.get(url);
        },
        postRequest: function(url, data) {
            return $.post(url, data);
        }
    }
});