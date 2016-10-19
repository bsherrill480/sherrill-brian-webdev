(function () {
    'use strict';

function WebsiteListController($routeParams, WebsiteService) {
    var vm = this,
        userId = $routeParams['uid'];
    function init() {
        vm.websites = WebsiteService.findWebsitesByUserId(userId);
    }
    
    vm.userId = userId;
    init();
    }

    function NewWebsiteController($location, $window, UserService) {
        var vm = this;

    }

    function EditWebsiteController($routeParams, UserService) {
        var vm = this;

    }

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', ['$routeParams', 'WebsiteService', WebsiteListController]);
        // .constant('NewWebsiteController', [NewWebsiteController])
        // .constant('EditWebsiteController', [EditWebsiteController])
})();
