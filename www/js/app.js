angular.module('expense', ['expense_services', 'expense_filters', 'expense_components'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/',                {templateUrl: 'partials/home.html'}).
			when('/menu',            {templateUrl: 'partials/menu.html'}).
            when('/login',           {templateUrl: 'partials/login.html'}).
            when('/history',         {templateUrl: 'partials/history.html'}).
            when('/create/info',     {templateUrl: 'partials/info.html'}).
            when('/create/overview', {templateUrl: 'partials/overview.html'}).
            when('/create/add',      {templateUrl: 'partials/add.html'}).
            when('/create/sign',     {templateUrl: 'partials/sign.html'}).
            otherwise({redirectTo: '/'});
    }])
    .run(function($location, AuthService) {
        if(!AuthService.hasAccessToken()) {
            $location.path('/login');
        }
    })
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
    .controller('AuthController', function($scope, $location, $http, AuthService, FlashService) {
        $scope.busy = false;

        $scope.isLoggedIn = function() {
            return AuthService.hasAccessToken();
        }

        $scope.login = function() {
            console.log('AuthCtrl::login()');
            $scope.busy = true;
            if($scope.email && $scope.password) {
                AuthService
                    .login($scope.email, $scope.password)
                    .success(function(data, status) {
                        if(data) {
                            console.log('AuthController::login() success clause');
                            $location.path('/');
                        } else {
                            $scope.onLoginError();
                        }
                    })
                    .error(function(data, status) {
                        console.log('AuthController::login() error clause');
                        $scope.onLoginError();
                    });
            } else {
                FlashService.addError('Please enter all credentials');
                $scope.busy = false;
            }
        };

        $scope.onLoginError = function() {
            FlashService.addError('Wrong username/password combination');
            $scope.busy = false;
        }

        $scope.logout = function() {
            console.log('AuthController::logout()');
            AuthService.logout();
            $location.path('/login');
        }
    })
    .controller('EmployeeController', function($scope) {

    })
    .controller('ExpenseFormController', function($scope, ExpenseFormService) {
        $scope.history = ExpenseFormService.getHistory();
        $scope.currentForm = ExpenseFormService.getCurrentForm();
    })
    .controller('ExpenseController', function($scope) {

    });





function ExpenseCtrl($scope, $http) {
    $scope.units = [
        {
            id: 1,
            name: "G20"
        }, {
            id: 2,
            name: "G21"
        }, {
            id: 3,
            name: "G22"
        }, {
            id: 4,
            name: "G23"
        }, {
            id: 5,
            name: "G30"
        }, {
            id: 6,
            name: "G31"
        }, {
            id: 7,
            name: "G32"
        }, {
            id: 8,
            name: "G33"
        }, {
            id: 9,
            name: "G34"
        }, {
            id: 10,
            name: "G35"
        }
    ],
    $scope.user = {
        name: {
            first: "Michiel",
            last: "Staessen"
        },
        number: 7,
        email: "staessenmichiel@gmail.com",
        unit: $scope.units[0]
    };
    $scope.expenses = [];
    $scope.expense = {
        date: {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        },
        user: $scope.user,
        description: ""
    };
    $scope.getNbExpenses = function() {
        return $scope.expenses.length;
    }
    $scope.addExpense = function() {

    }

}


