describe('App Services', function () {
    var token;

    describe('UserService', function () {
        it('/login', inject(function (UserService) {
            var response, statusCode;

            runs(function () {
                UserService
                    .login('michiel.staessen@student.kuleuven.be', 'test123')
                    .success(function (data, status) {
                        statusCode = status;
                        token = response = data;
                    })
                    .error(function (data, status) {
                        statusCode = status;
                    });
            }, 'fetch access token by logging in');

            waitsFor(function () {
                return statusCode !== undefined;
            }, 'fetching access token', 20000);

            runs(function () {
                expect(statusCode).toEqual(200);
                expect(response).toMatch(/[a-z0-9-]?/);
            });
        }));

        it('/getEmployee', inject(function (UserService) {
            var statusCode, response, expected = {
                email: 'michiel.staessen@student.kuleuven.be',
                employeeNumber: '4203',
                firstName: 'Michiel',
                id: '1',
                lastName: 'Staessen',
                password: 'test123',
                unitId: '1'
            };

            runs(function () {
                UserService
                    .getEmployee(token)
                    .success(function (data, status) {
                        statusCode = status;
                        response = data;
                    })
                    .error(function (data, status) {
                        statusCode = status;
                    });
            }, 'fetch employee');

            waitsFor(function () {
                return statusCode !== undefined;
            }, 'fetching the employee', 20000);

            runs(function () {
                expect(response).toEqual(expected);
            });
        }));
    });

    describe('ExpenseService', function () {
        it('/getProjectSuggestion', inject(function (ExpenseService) {
            var statusCode, response, expected = {
                data: [
                    'G20ARRRR',
                    'G20AZER',
                    'G20AZERIII',
                    'G20AZERRR',
                    'G20BEEEE'
                ]
            };

            runs(function () {
                ExpenseService
                    .getProjectCodeSuggestion('G2')
                    .success(function (data, status) {
                        statusCode = status;
                        response = data;
                    })
                    .error(function (data, status) {
                        statusCode = status;
                    });
            }, 'fetch suggestions');

            waitsFor(function () {
                return statusCode !== undefined;
            }, 'fetching suggestions', 20000);

            runs(function () {
                expect(response).toEqual(expected);
            });
        }));

        it('/saveExpense', inject(function (ExpenseService) {
            var statusCode, response, expenseCase = {
                date: new Date(),
                employeeId: 1,
                remarks: 'Some Remark',
                notification: true,
                expenses: [
                    {
                        date: new Date(),
                        projectCode: 'G20AERZ',
                        currency: 'EUR',
                        amount: 10.2,
                        remarks: 'parking',
                        expenseTypeId: 6,
                        expenseLocationId: 1
                    }
                ]
            };

            runs(function () {
                ExpenseService
                    .saveExpense(token, expenseCase)
                    .success(function (data, status) {
                        statusCode = status;
                        response = data;
                        console.log('Success!');
                        console.log(data);
                    })
                    .error(function (data, status) {
                        statusCode = status;
                        console.log('Error!');
                        console.log(data);
                    });
            }, 'save expense');

            waitsFor(function () {
                return undefined !== statusCode;
            }, 'sending expense', 20000);

            runs(function () {
                console.log(statusCode);
                expect(statusCode).toBe(200);
            });
        }));
    });

    describe('CurrencyService', function () {
        it('/getCurrencies', inject(function (CurrencyService) {
            var currencies;

            runs(function () {
                CurrencyService
                    .getCurrencies()
                    .then(function (data) {
                        currencies = data;
                    });
            }, 'fetch currencies');

            waitsFor(function () {
                return undefined !== currencies;
            }, 'fetching currencies', 20000);

            runs(function () {
                expect(Object.keys(currencies.rates)).toContain('USD');
                expect(Object.keys(currencies.rates)).toContain('GBP');
                expect(Object.keys(currencies.rates)).toContain('JPY');
                expect(Object.keys(currencies.rates)).toContain('BGN');
                // ... and many more
            });
        }));
    });
});