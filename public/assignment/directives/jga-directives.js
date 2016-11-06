(function () {
    'use strict';

    angular
        .module('WebAppMaker')
        .directive('sortable', function () {
            return {
                restrict: 'A',
                scope: {
                    'sort': '&onSort'
                },
                link: function ($scope, element) {
                    var start,
                        end;
                    $(element).sortable({
                        sort: function (event, ui) {
                            start = ui.item.index();
                        },
                        stop: function (event, ui) {
                            end = ui.item.index();
                            //fix for positioning due to jQueryUI
                            if(start > end) {
                                start--;
                            }
                            $scope.sort({
                                start: start,
                                end: end
                            });
                        }
                    })
                }
            }
        })
        // https://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm
        .directive('fileModel', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);
})();
