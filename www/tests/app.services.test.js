describe('App Services', function () {
    describe('AnotherService', function () {
        it('AnotherMethod', inject(function (AnotherService) {
            expect(AnotherService.anotherMethod()).toEqual('anotherMethod');
        }));
    });

    describe('SomeService', function () {
        it('SomeMethod', inject(function (SomeService) {
            expect(SomeService.someMethod()).toEqual('someMethod');
        }));
    });

    describe('AsyncService', function () {
        it('AsyncMethod', inject(function (AsyncService) {
            var number = 1;
            AsyncService.asyncMethod(number, function(result) {
                expect(result).toEqual(number + 1);
            });
        }));
    });
});