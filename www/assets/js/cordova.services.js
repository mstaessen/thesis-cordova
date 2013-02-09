angular
    .module('ngCordova', [])
    .factory('Navigator', function ($q, $rootScope) {
        var Navigator = function (deferred) {
            this.deferred = deferred;
        };
        Navigator.prototype.isDeviceReady = function () {
            return (this.deferred.value === true);
        };
        Navigator.prototype.setDeviceReady = function () {
            var that = this;
            $rootScope.$apply(function () {
                that.deferred.resolve(true);
            });
        };
        Navigator.prototype.do = function (fn) {
            this.deferred.promise.then(fn);
        };

        return new Navigator($q.defer());
    })
    .factory('Accelerometer', function (Navigator) {
        return {
            getCurrentAcceleration: function (onSuccess, onError) {
                Navigator.do(function () {
                    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
                });
            },
            watchAcceleration: function (onSuccess, onError, options) {
                Navigator.do(function () {
                    // TODO Return value?!
                    navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
                });
            },
            clearWatch: function (watchID) {
                Navigator.do(function () {
                    navigator.accelerometer.clearWatch(watchID);
                });
            }
        };
    })
    .factory('Camera', function (Navigator) {

    })
    .factory('Capture', function (Navigator) {

    })
    .factory('Compass', function (Navigator) {

    })
    .factory('Connection', function (Navigator) {

    })
    .factory('Contacts', function (Navigator) {

    })
    .factory('Device', function (Navigator) {

    })
    .factory('Events', function (Navigator) {

    })
    .factory('File', function (Navigator) {

    })
    .factory('Geolocation', function (Navigator) {

    })
    .factory('Globalization', function (Navigator) {

    })
    .factory('InAppBrowser', function (Navigator) {

    })
    .factory('Media', function (Navigator) {

    })
    .factory('Notification', function (Navigator) {

    })
    .factory('SplashScreen', function (Navigator) {

    })
    .factory('Storage', function (Navigator) {

    })
    .run(function (Navigator) {
        document.addEventListener('deviceReady', function (event) {
            Navigator.setDeviceReady();
        }, false);
    });