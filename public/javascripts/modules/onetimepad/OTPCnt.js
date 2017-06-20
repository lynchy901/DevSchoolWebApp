/**
 * Created by Nathan.Lynch on 6/19/2017.
 */
var otp = angular.module("OTP", ['sharedServices']);

otp.controller("OTPEncryptCnt",['$scope', 'ajaxService', function($scope, ajaxService) {
   $scope.name;
   $scope.key;
   $scope.message;

   $scope.submitEncryptionRequest = function() {
       var resultAndKey = ajaxService.postRequest("/users/test", {data:$scope.name});
       resultAndKey.then(function(response) {
           $scope.inkey = response.data.key;
           $scope.message = response.data.encryptedMessage;
       });
   }
}]);

otp.controller("OTPDecryptCnt",['$scope', 'ajaxService', function($scope, ajaxService) {
   $scope.name;
   $scope.inkey;
   $scope.message;

   $scope.submitDecryptionRequest = function() {
       var resultAndKey = ajaxService.postRequest("/users/dec", {data:$scope.name, msg:$scope.inkey});
       resultAndKey.then(function(response) {
           $scope.inkey = response.key;
           $scope.message = response.encryptedMessage;
           console.log(response);
       });
   }
}]);