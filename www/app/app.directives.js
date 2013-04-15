'use strict';

angular.module('app.directives', [])
    .directive('flashes', function() {
        return {
            restrict: 'E',
            templateUrl: 'view/_flashes.html'
        }
    });