/**
 * Created by Nathan.Lynch on 6/19/2017.
 */
function go() {

}

var app = angular.module("OTP", []);

app.controller("OTPEncryptCnt",['$scope', 'ajaxService', function($scope, ajaxService) {
   $scope.name;
   $scope.key;
   $scope.message;

   $scope.submitData = function() {
       var resultAndKey = ajaxService.postRequest("/users/test", {data:$scope.name});

       resultAndKey.then(function(response) {
           $scope.inkey = response.key;
           $scope.message = response.encryptedMessage;
           console.log(response);
           $scope.$apply();

       });
   }
}]);

app.controller("OTPDecryptCnt",['$scope', 'ajaxService', function($scope, ajaxService) {
   $scope.name;
   $scope.inkey;
   $scope.message;

   $scope.submitDataDec = function() {
       var resultAndKey = ajaxService.postRequest("/users/dec", {data:$scope.name, msg:$scope.inkey});
       resultAndKey.then(function(response) {
           $scope.inkey = response.key;
           $scope.message = response.encryptedMessage;
           console.log(response);
           $scope.$apply();
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