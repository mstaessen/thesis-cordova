angular
    .module('app.controllers', [])
    .controller('FlashController', function ($scope, FlashService) {
        $scope.hasFlashes = function () {
            return FlashService.hasFlashes();
        };
        $scope.getFlashes = function () {
            return FlashService.getFlashes();
        };
        $scope.dismiss = function (index) {
            return FlashService.dismiss(index);
        };
        $scope.dismissAll = function () {
            return FlashService.dismissAll();
        }
    });