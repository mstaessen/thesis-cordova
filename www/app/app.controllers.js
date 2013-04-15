'use strict';

angular.module('app.controllers', [])
    .controller('FlashController', function($scope, FlashService) {
        $scope.hasFlashes = function() {
            return FlashService.hasFlashes();
        };
        $scope.getFlashes = function() {
            return FlashService.getFlashes();
        };
        $scope.dismiss = function(index) {
            return FlashService.dismiss(index);
        };
        $scope.dismissAll = function() {
            return FlashService.dismissAll();
        }
    })
    .controller('MenuController', function($location, $document) {
        if ($document.width() >= 720) {
            // replace() replaces the current history entry, making sure
            // that the user will not get stuck in a redirect loop. Awesome!
            $location.path('/wizard/info').replace();
        }
    })
    .controller('AuthController', function($scope) {

    });