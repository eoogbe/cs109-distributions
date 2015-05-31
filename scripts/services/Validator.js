var CS109 = (function(my){
    VALIDATION_RULES = {
        atLeast: function(limit, num) {
            return num < limit;
        },
        atMost: function(limit, num) {
            return num > limit;
        },
        greaterThan: function(limit, num) {
            return num <= limit;
        },
        lessThan: function(limit, num) {
            return num >= limit;
        }
    };
    
    my.Validator = function(validationRules){
        this.validationRules = validationRules;
    };
    
    my.Validator.prototype.validate = function() {
        for (var i = 0; i < this.validationRules.length; ++i) {
            var rule = this.validationRules[i];
            if (VALIDATION_RULES[rule.type](rule.limit, rule.value)) return rule;
        }
        
        return false;
    };
    
    return my;
})(CS109 || {});
