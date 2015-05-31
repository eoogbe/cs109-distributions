var CS109 = (function(my){
    my.Binomial = function(parameters){
        if (parameters.length === 2) {
            this.n = parseInt(parameters[0].trim());
            this.p = parseFloat(parameters[1].trim());
            this.validator = new my.Validator([{
                paramName: "n",
                typeName: "at least",
                value: this.n,
                type: "atLeast",
                limit: 0
            },
            {
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
            this.n = this.p = NaN;
        }
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
            result.paramRules = [{
                paramName: "n",
                description: "positive integer"
            },
            {
                paramName: "p",
                description: "real number between 0 and 1 exclusive"
            }];
            return result;
        }
        
        result.expectedValue = my.round3(this.n * this.p);
        result.variance = my.round3(this.n * this.p * (1 - this.p));
        result.pmf = "<mfenced><mtable>" +
            "<mtr><mtd><mn>" + this.n + "</mn></mtd></mtr>" +
            "<mtr><mtd><mi>i</mi></mtd></mtr>" +
        "</mtable></mfenced>" +
        "<msup><mfenced><mn>" + my.round3(this.p) +"</mn></mfenced><mi>i</mi></msup>" +
        "<msup>" +
            "<mfenced><mn>" + my.round3(1 - this.p) +"</mn></mfenced>" +
            "<mrow><mn>" + my.round3(this.n) + "</mn><mo>-</mo><mi>i</mi></mrow>" +
        "</msup>";
        return result;
    };
    
    return my;
})(CS109 || {});
