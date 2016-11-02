_ = require('lodash');

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
    }
};