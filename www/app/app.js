'use strict';

angular.module('app', ['app.controllers', 'app.services', 'app.directives', 'app.filters'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',                  {templateUrl: 'view/default/index.html'})
            .when('/auth/login',        {templateUrl: 'view/auth/login.html'})
            .when('/history',           {templateUrl: 'view/history/index.html'})
            .when('/wizard',            {templateUrl: 'view/wizard/index.html'})
            .when('/wizard/info',       {templateUrl: 'view/wizard/info.html'})
            .when('/wizard/overview',   {templateUrl: 'view/wizard/overview.html'})
            .when('/wizard/add',        {templateUrl: 'view/wizard/add.html'})
            .when('/wizard/sign',       {templateUrl: 'view/wizard/sign.html'})
            .otherwise({redirectTo: '/'});
    });