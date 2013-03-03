angular.module('expense_services', ['ngResource'])
    .factory('FlashService', function($rootScope) {
        var FlashService = function() {
            this.flashes = [];
        }
        FlashService.prototype = {
            hasFlashes: function() {
                return this.flashes.length != 0;
            },
            getFlashes: function() {
                return this.flashes;
            },
            addFlash: function(type, msg) {
                this.flashes.push({
                    type: type,
                    msg: msg
                });
            },
            addError: function(msg) {
                this.addFlash('error', msg);
            },
            addWarning: function(msg) {
                this.addFlash('warning', msg);
            },
            addInfo: function(msg) {
                this.addFlash('info', msg);
            },
            addSuccess: function(msg) {
                this.addFlash('success', msg);
            },
            dismiss: function(index) {
                this.flashes.splice(index, 1);
            },
            dismissAll: function() {
                this.flashes = [];
            }
        }
        var flashService = new FlashService();
        // Clear flashes on page changes
        $rootScope.$on('$routeChangeSuccess', function() {
            flashService.dismissAll();
        });
        return flashService;
    })
    .factory('AuthService', function($http, $location, UserService) {
        var AuthService = function() {
            this.accessToken = null;
            this.identity = null;
        };
        AuthService.prototype = {
            LS_KEY_ACCESS_TOKEN: 'auth_access_token',
            LS_KEY_IDENTITY: 'auth_identity',
            login: function(username, password) {
                // prevent scoping issue
                var self = this;
                return $http
                    .post('http://thesisexpenseapp.appspot.com/resources/userService/login', encodeURI('email=' + username + '&password=' + password), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                    .success(function(data, status, headers, config) {
                        console.log('Auth::login() success clause');
                        if(data) {
                            self.setAccessToken(data);
                            UserService.getEmployee(self.getAccessToken())
                                .success(function(data, status, headers, config) {
                                    if(data) {
                                        self.setIdentity(data);
                                    }
                                });
                        }
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Auth::login() error clause');
                    });
            },
            logout: function() {
                // prevent scoping issues
                var self = this;
                return $http
                    .post('http://thesisexpenseapp.appspot.com/resources/userService/logout', '', {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                    .success(function(data, status, headers, config) {
                        console.log('Auth::logout() success clause');
                        self.clearAccessToken();
                        self.clearIdentity();
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Auth::logout() error clause');
                    });
            },
            hasAccessToken: function() {
                return Boolean(this.getAccessToken());
            },
            getAccessToken: function() {
                if(!this.accessToken) {
                    this.accessToken = localStorage.getItem(this.LS_KEY_ACCESS_TOKEN);
                }
                return this.accessToken;
            },
            setAccessToken: function(accessToken) {
                if(accessToken) {
                    this.accessToken = accessToken;
                    localStorage.setItem(this.LS_KEY_ACCESS_TOKEN, this.accessToken);
                }
            },
            clearAccessToken: function() {
                this.accessToken = null;
                localStorage.removeItem(this.LS_KEY_ACCESS_TOKEN);
            },
            hasIdentity: function () {
                return Boolean(this.getIdentity());
            },
            getIdentity: function() {
                if(!this.identity) {
                    this.identity = JSON.parse(localStorage.getItem(this.LS_KEY_IDENTITY));
                }
                return this.identity;
            },
            setIdentity: function(identity) {
                if(identity) {
                    this.identity = identity;
                    localStorage.setItem(this.LS_KEY_IDENTITY, JSON.stringify(this.identity));
                }
            },
            clearIdentity: function() {
                this.identity = null;
                localStorage.removeItem(this.LS_KEY_IDENTITY);
            }
        };
        return new AuthService();
    })
    .factory('UserService', function($resource, $http) {
        var UserService = function() {};
        UserService.prototype = {
            getEmployee: function(token) {
                return $http
                    .post('http://thesisexpenseapp.appspot.com/resources/userService/getEmployee', encodeURI('token=' + token), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    });
            }
        };
        return new UserService();
    })
    .factory('ExpenseFormService', function($http, AuthService) {
        var ExpenseFormService = function() {
            this.currentForm = this.getDefaultForm();
        };
        ExpenseFormService.prototype = {
            getCurrentForm: function() {
                return this.currentForm;
            },
            getDefaultForm: function() {
                var user = AuthService.getIdentity();
                var date = new Date();
                if(date.getDay() > 15) {
                    date.setMonth(date.getMonth() - 1);
                }
                return {
                    date: {
                        month: date.getMonth(),
                        year: date.getFullYear()
                    },
                    user: {
                        id: parseInt(user.id),
                        number: parseInt(user.employeeNumber),
                        name: {
                            first: user.firstName,
                            last:  user.lastName
                        },
                        email: user.email,
                        unit: parseInt(user.unitId)
                    },
                    expenses: []
                };
            },
            getHistory: function () {
                return [];
            }
        };
        return new ExpenseFormService();
    })
    .factory('CurrencyService', function($http){

    });