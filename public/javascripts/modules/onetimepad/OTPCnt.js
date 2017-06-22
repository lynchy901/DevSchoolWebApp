/**
 * Created by Nathan.Lynch on 6/19/2017.
 */
var otp = angular.module("OTP", ['sharedServices']);

otp.controller("OTPEncryptCnt", ['$scope', 'ajaxService', 'sharedProperties', function ($scope, ajaxService, sharedProperties) {
    $scope.plainText;
    $scope.key;
    $scope.cipherText;

    $scope.submitEncryptionRequest = function () {
        var resultAndKey = ajaxService.postRequest("/users/test", { data: $scope.plainText });
        resultAndKey.then(function (response) {
            $scope.plainText = "";
            $scope.key = response.data.key;
            $scope.cipherText = response.data.cipherText.join(",");
            sharedProperties.setPek(response.data.cipherText.join(","));
            sharedProperties.setKek(response.data.key);
        });
    }
}]);

otp.controller("OTPDecryptCnt", ['$scope', 'ajaxService', 'sharedProperties', function ($scope, ajaxService, sharedProperties) {
    $scope.plainText = "";
    $scope.key;
    $scope.cipherText;

    $scope.submitDecryptionRequest = function () {
        var resultAndKey = ajaxService.postRequest("/users/dec", { data: $scope.cipherText, msg: $scope.key });
        resultAndKey.then(function (response) {
            $scope.plainText = response.data.plainText;
        });
    }
    $scope.$watch(
        function () {
            if (sharedProperties.toAddCrm()) {
                $scope.cipherText = sharedProperties.getCrm();
            }
            if (sharedProperties.toAddCrk()) {
                $scope.key = sharedProperties.getCrk();
            }

        }
    )

}]);

otp.controller("msgSec", ['$scope', 'ajaxService', 'sharedProperties', function ($scope, ajaxService, sharedProperties) {
    $scope.curMsg;
    $scope.newMsg;
    $scope.contents;
    $scope.sendMsg = function () {
        var resultAndKey = ajaxService.postRequest("/users/msg", { msg: $scope.contents, key: $scope.key });
        resultAndKey.then(function (response) {
            $scope.newMsg = "";
            $scope.newMsg = response.data.message;
            console.log(response.data.message);
        });
    }
    $scope.loadMsg = function (mg) {
        sharedProperties.setCrm(mg);
    }
    $scope.loadKey = function (mg) {
        sharedProperties.setCrk(mg);
    }
    $scope.sendMsg();
    $scope.$watch(
        function () {
            if (sharedProperties.toAddPek()) {
                $scope.contents = sharedProperties.getPek();
            }
            if (sharedProperties.toAddKek()) {
                $scope.key = sharedProperties.getKek();
            }

        }
    )


}]);






