const _ = require('lodash');

module.exports = {
    getIdCounter() {
        return {
            _count: 1000,
            getCountAndIncrement() {
                let oldCount = this._count;
                this._count++;
                return String(oldCount);
            }
        };   
    },

    ifUndefinedThenDefault(val, defaultVal) {
        return _.isUndefined(val) ? defaultVal : val;
    },
    
    ifHasAttrThenIsString(obj, attr) {
        let attrVal = obj[attr];
        return _.isUndefined(attrVal) || _.isString(attrVal);
    },
    
    set404IfEmpty(res) {
        return function (result) {
            // null is also considered empty
            if(_.isEmpty(result)) {
                res.status(404);
            }
                
            return result
        }
    },
    
    queryResponse(res, queryPromise) {
        queryPromise
            .then(function(result) {
                console.log('got payload', result);
                res.json(result)
            })
            .catch(function (err) {
                console.log('got err', err);
            })
    }
};