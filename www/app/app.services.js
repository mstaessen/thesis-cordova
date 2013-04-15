'use strict';

angular.module('app.services', [])
    .factory('FlashService', function ($rootScope) {
        var FlashService = function () {
            this.flashes = [];
        }
        FlashService.prototype.hasFlashes = function () {
            return this.flashes.length != 0;
        };
        FlashService.prototype.getFlashes = function () {
            return this.flashes;
        };
        FlashService.prototype.addFlash = function (type, msg) {
            this.flashes.push({
                type: type,
                msg: msg
            });
        };
        FlashService.prototype.addError = function (msg) {
            this.addFlash('error', msg);
        };
        FlashService.prototype.addWarning = function (msg) {
            this.addFlash('warning', msg);
        };
        FlashService.prototype.addInfo = function (msg) {
            this.addFlash('info', msg);
        };
        FlashService.prototype.addSuccess = function (msg) {
            this.addFlash('success', msg);
        };
        FlashService.prototype.dismiss = function (index) {
            this.flashes.splice(index, 1);
        };
        FlashService.prototype.dismissAll = function () {
            this.flashes = [];
        };
        var flashService = new FlashService();
        // Clear flashes on page changes
        $rootScope.$on('$routeChangeSuccess', function () {
            flashService.dismissAll();
        });
        return flashService;
    })
    .factory('UserService', function ($http) {
        var baseURL = 'https://kulcapexpenseapp.appspot.com/resources/userService';
        return {
            login: function (username, password) {
                return $http.post(baseURL + '/login', encodeURI('email=' + username + '&password=' + password), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            logout: function (token) {
                return $http.post(baseURL + '/logout', encodeURI('token=' + token), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            getEmployee: function (token) {
                return $http.post(baseURL + '/getEmployee', encodeURI('token=' + token), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            }
        };
    })
    .factory('ExpenseService', function ($http) {
        var baseURL = 'https://kulcapexpenseapp.appspot.com/resources/expenseService';
        return {
            getProjectCodeSuggestion: function (keyword) {
                return $http.post(baseURL + '/getProjectCodeSuggestion', encodeURI('keyword=' + keyword), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            saveExpense: function (token, expenseForm) {
                return $http.post(baseURL + '/saveExpense', JSON.stringify({
                    token: token,
                    expenseForm: expenseForm
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getExpenseFormPDF: function (token, expenseFormId) {
                return $http.post(baseURL + '/getExpenseFormPDF', encodeURI('token=' + token + '&expenseFormId=' + expenseFormId), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            }
        };
    })
    .factory('CurrencyService', function ($http, $q) {
        var CurrencyService = function () {
            var that = this;
            var LOCALSTORAGE_KEY = 'CurrencyService.currencies';
            var BASE_URL = 'https://kulcapexpenseapp.appspot.com/resources/currencyService';
            var parser = new DOMParser();
            var currencies = null

            function updateCurrencies() {
                var promise = $http.post(BASE_URL + '/getCurrencies', '', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                var deferred = $q.defer();
                promise.success(function (data, status, headers, config) {
                    var xml = parser.parseFromString(data, "application/xml");
                    var cube, i = 0, currencies = {
                        fetchDate: new Date(),
                        date: null,
                        rates: {}
                    };
                    while (cube = xml.getElementsByTagName('Cube')[i++]) {
                        if (cube.hasAttribute('time')) {
                            currencies.date = new Date(cube.getAttribute('time'));
                        } else if (cube.hasAttribute('currency') && cube.hasAttribute('rate')) {
                            currencies.rates[cube.getAttribute('currency')] = parseFloat(cube.getAttribute('rate'));
                        }
                    }
                    deferred.resolve(currencies);
                });
                promise.error(function (data, status, headers, config) {
                    deferred.reject('Error while fetching conversion rates');
                });
                return deferred.promise;
            }

            function getCurrencies() {
                var deferred = $q.defer();
                // If cache is outdated or non-existant, fetch conversion rates
                if (!currencies || (new Date() - currencies.date) > 24 * 3600 * 1000) {
                    updateCurrencies().then(function (data) {
                        currencies = data;
                        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(currencies));
                        deferred.resolve(currencies);
                    }, function (error) {
                        deferred.reject(error);
                    });
                } else {
                    deferred.resolve(currencies);
                }
                return deferred.promise;
            }

            this.getCurrencyCodes = function () {
                var deferred = $q.defer();
                getCurrencies().then(function(currencies) {
                    deferred.resolve(Object.keys(currencies.rates));
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            this.convert = function (amount, currency) {
                var deferred = $q.defer();
                getCurrencies().then(function(currencies) {
                    if (currencies.rates[currency]) {
                        deferred.resolve(amount / currencies.rates[currency]);
                    } else {
                        deferred.reject({
                            msg: 'No such rate.'
                        });
                    }
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
        };
        return new CurrencyService();
    });