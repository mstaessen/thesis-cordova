angular
    .module('app.controllers', [])
    .controller('AnotherController', function ($scope) {
        $scope.initAnotherModel = function () {
            return 'anotherModel';
        };
    })
    .controller('SomeController', function ($scope) {
        $scope.initSomeModel = function () {
            return 'SomeModel';
        };
    });