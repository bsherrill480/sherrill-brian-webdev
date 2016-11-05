(function () {
    'use strict';
    
    angular
        .module('WebAppMaker')
        // http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
        .directive('myEnter', function () {  // my-enter="doSomething()
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });   
})();

