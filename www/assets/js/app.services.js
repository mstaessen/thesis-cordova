angular
    .module('app.services', [])
    .factory('SomeService', function () {
        var SomeService = function () {

        };
        SomeService.prototype.someMethod = function () {
            return 'someMethod';
        };
        return new SomeService();
    })
    .factory('AnotherService', function () {
        var AnotherService = function () {

        };
        AnotherService.prototype.anotherMethod = function () {
            return 'anotherMethod';
        };
        return new AnotherService();
    })
    .factory('AsyncService', function () {
        var AsyncService = function () {

        };
        AsyncService.prototype.asyncMethod = function (value, callback) {
            setTimeout(function () {
                callback(value + 1);
            }, 10000);
        }
        return new AsyncService();
    });