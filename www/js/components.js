angular.module('expense_components', [])
    .directive('flashes', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/flashes.html'
        }
    });