angular
    .module('app', ['app.controllers', 'app.services', 'app.filters', 'app.directives'])
    .config(function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/home.html'}).
            when('/menu', {templateUrl: 'partials/menu.html'}).
            when('/login', {templateUrl: 'partials/login.html'}).
            when('/history', {templateUrl: 'partials/history.html'}).
            when('/create/info', {templateUrl: 'partials/info.html'}).
            when('/create/overview', {templateUrl: 'partials/overview.html'}).
            when('/create/add', {templateUrl: 'partials/add.html'}).
            when('/create/sign', {templateUrl: 'partials/sign.html'}).
            otherwise({redirectTo: '/'});
    })
    .run(function ($location /*, AuthService*/) {
        //if (!AuthService.hasAccessToken()) {
        //    $location.path('/login');
        //}
    });