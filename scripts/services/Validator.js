var CS109 = (function(my){
    VALIDATION_RULES = {
        probability: function(p) {
            return p < 0 || p > 1;
        },
        positive: function(n) {
            return n < 0;
        }
    };
    
    my.Validator = function(validationRules){
        this.validationRules = validationRules;
    };
    
    my.Validator.prototype.validate = function() {
        for (var i = 0; i < this.validationRules.length; ++i) {
            var rule = this.validationRules[i];
            if (VALIDATION_RULES[rule.type](rule.value)) return rule;
        }
        
        return false;
    };
    
    return my;
})(CS109 || {});
