var CS109 = (function(my){
    my.Poisson = function(parameters){
        if (parameters.length === 1) {
            this.lambda = parseFloat(parameters[0].trim());
            this.validator = new my.Validator([{
                paramName: "&lambda;",
                value: this.lambda,
                typeName: "at least",
                type: "atLeast",
                limit: 0
            }]);
        } else {
            this.lambda = NaN;
        }
    };
    
    my.Poisson.create = function(parameters) {
        return new my.Poisson(parameters);
    }
    
    my.Poisson.prototype.calculate = function() {
        if (isNaN(this.lambda)) return { error: true };
        var result = { parsedInput: "Poi(" + this.lambda + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Poi(&lambda;)";
            result.paramRules = [{
                paramName: "&lambda;",
                description: "positive real number"
            }];
            return result;
        }
        
        result.expectedValue = this.lambda;
        result.variance = this.lambda;
        return result;
    };
    
    return my;
})(CS109 || {});
