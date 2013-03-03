angular.module('expense_filters', []).
    filter('error', function () {
        return function (bool) {
            return bool ? ' error' : '';
        };
    }).
    filter('disabled', function() {
        return function (bool) {
            return bool ? 'disabled' : 'no';
        };
    }).
    filter('alertClass', function() {
        return function(input) {
            switch (input) {
                case 'error':
                    return 'alert alert-error';
                case 'warning':
                    return 'alert';
                case 'info':
                    return 'alert alert-info';
                case 'success':
                    return 'alert alert-success';
                default:
                    return 'alert';
            }
        }
    });