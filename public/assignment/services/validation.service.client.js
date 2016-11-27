(function() {
    'use strict';
    var NAME_REQUIRED_MSG = "Name required.",
        INVALID_ALERT_MSG = "Please fix errors below.";

    function ValidationService() {
        var api;
        api = {
            // for controllers that only need to have "name" validated
            nameOnlyValidation: {

                // call this with init() to set the errors object on vm
                initNameOnlyValidation: function (vm) {
                    vm.errors = {
                        name: '',
                        alertError: ''
                    };
                },

                //call this with vm and the model that has name. Make sure model is defined.
                validInputs: function (vm, model) {
                    var nameValid = model.name;
                    vm.errors.name = nameValid ? '' : NAME_REQUIRED_MSG;
                    vm.errors.alertError = nameValid ? '' : INVALID_ALERT_MSG;
                    return nameValid
                }
            },
            
            alertMessages: {
                INVALID_ALERT: INVALID_ALERT_MSG,
                SERVER_ERROR_ALERT: "Server error."
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('ValidationService', ValidationService);

})();
