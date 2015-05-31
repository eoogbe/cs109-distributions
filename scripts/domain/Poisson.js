var CS109 = (function(my){
    my.Poisson = function(parameters){
        this.lambda = parseFloat(parameters[0].trim());
        this.validator = new CS109.Validator([{
            type: "positive",
            paramName: "&lambda;",
            value: this.lambda
        }]);
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
            return result;
        }
        
        result.expectedValue = this.lambda;
        result.variance = this.lambda;
        return result;
    };
    
    return my;
})(CS109 || {});
