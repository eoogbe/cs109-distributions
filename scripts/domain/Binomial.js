var CS109 = (function(my){
    my.Binomial = function(parameters){
        this.n = parseInt(parameters[0].trim());
        this.p = parseFloat(parameters[1].trim());
        this.validator = new CS109.Validator([{
            type: "positive",
            paramName: "n",
            value: this.n
        },
        {
            type: "probability",
            paramName: "p",
            value: this.p
        }]);
    };
    
    my.Binomial.create = function(parameters) {
        return new my.Binomial(parameters);
    };
    
    my.Binomial.prototype.calculate = function() {
        if (isNaN(this.p) || isNaN(this.n)) return { error: true };
        var result = { parsedInput: "Bin(" + this.n + ", " + this.p + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Bin(n,p)";
            return result;
        }
        
        result.expectedValue = this.n * this.p;
        result.variance = this.n * this.p * (1 - this.p);
        return result;
    };
    
    return my;
})(CS109 || {});
