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

sharedServices.factory("sharedProperties", function(){
    var pek = 'pek';
    var toAddPek = false;
    var kek = 'kek';
    var toAddKek = false;
    var crm = 'crm';
    var toAddCrm = false;
    var crk = 'crk';
    var toAddCrk = false;
    return {
        getPek: function () {
            toAddPek= false;
            return pek;
        },
        setPek: function(value) {
            toAddPek = true;
            pek = value;
        },
        toAddPek: function() {
            return toAddPek;
        },
        getKek: function () {
            toAddKek= false;
            return kek;
        },
        setKek: function(value) {
            toAddKek = true;
            kek = value;
        },
        toAddKek: function() {
            return toAddKek;
        },
        getCrm: function () {
            toAddCrm= false;
            return crm;
        },
        setCrm: function(value) {
            toAddCrm = true;
            crm = value;
        },
        toAddCrm: function() {
            return toAddCrm;
        },
        getCrk: function () {
            toAddCrk= false;
            return crk;
        },
        setCrk: function(value) {
            toAddCrk = true;
            crk = value;
        },
        toAddCrk: function() {
            return toAddCrk;
        }
    };
});