var CS109 = (function(my){
    my.Bernoulli = function(parameters){
        if (parameters.length === 1) {
            this.p = parseFloat(parameters[0].trim());
            this.validator = new my.Validator([{
                paramName: "p",
                value: this.p,
                typeName: "greater than",
                type: "greaterThan",
                limit: 0
            },
            {
                paramName: "p",
                typeName: "at most",
                value: this.p,
                type: "atMost",
                limit: 1
            }]);
        } else {
            this.p = NaN;
        }
    };
    
    my.Bernoulli.create = function(parameters) {
        return new my.Bernoulli(parameters);
    }
    
    my.Bernoulli.prototype.calculate = function() {
        if (isNaN(this.p)) return { error: true };
        var result = { parsedInput: "Ber(" + this.p + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Ber(p)";
            result.paramRules = [{
                paramName: "p",
                description: "real number between 0 and 1 exclusive"
            }];
            return result;
        }
        
        result.expectedValue = this.p;
        result.variance = this.p * (1 - this.p);
        return result;
    };
    
    return my;
})(CS109 || {});
