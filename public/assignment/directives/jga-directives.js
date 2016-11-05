(function () {
    'use strict';

    angular
        .module('WebAppMaker')
        // http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
        .directive('sortable', function () {  // my-enter="doSomething()
            console.log('Sortable init');
            return {
                restrict: 'A',
                scope: {
                    'sort': '&onSort'
                },
                link: function ($scope, element) {
                    $(element)
                        .sortable({
                            sort: function (event, $el) {
                                console.log("sort");
                                // start = $el.item.index();
                            },
                            stop: function (event, $el) {
                                console.log("stop sort");
                                $scope.sort({
                                    start: -1,
                                    end: -1
                                });
                            }
                        })
                }
            }
        });
})();
