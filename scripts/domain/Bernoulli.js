var CS109 = (function(my){
    my.Bernoulli = function(parameters){
        this.p = parseFloat(parameters[0].trim());
        this.validator = new CS109.Validator([{
            type: "probability",
            paramName: "p",
            value: this.p
        }]);
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
            return result;
        }
        
        result.expectedValue = this.p;
        result.variance = this.p * (1 - this.p);
        return result;
    };
    
    return my;
})(CS109 || {});
