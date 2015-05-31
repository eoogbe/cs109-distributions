var CS109 = (function(my){
    my.Geometric = function(parameters){
        if (parameters.length === 1) {
            this.p = parseFloat(parameters[0].trim());
            this.validator = new my.Validator([{
                paramName: "p",
                typeName: "greater than",
                value: this.p,
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
    
    my.Geometric.create = function(parameters) {
        return new my.Geometric(parameters);
    }
    
    my.Geometric.prototype.calculate = function() {
        if (isNaN(this.p)) return { error: true };
        var result = { parsedInput: "Geo(" + this.p + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Geo(p)";
            result.paramRules = [{
                paramName: "p",
                description: "real number between 0 and 1 exclusive"
            }];
            return result;
        }
        
        result.expectedValue = 1 / this.p;
        result.variance = (1 - this.p) / (this.p * this.p);
        return result;
    };
    
    return my;
})(CS109 || {});
