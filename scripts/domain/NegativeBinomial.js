var CS109 = (function(my){
    my.NegativeBinomial = function(parameters){
        if (parameters.length === 2) {
            this.r = parseInt(parameters[0].trim());
            this.p = parseFloat(parameters[1].trim());
            this.validator = new my.Validator([{
                paramName: "r",
                value: this.r,
                typeName: "greater than",
                type: "greaterThan",
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
                value: this.p,
                typeName: "at most",
                type: "atMost",
                limit: 1
            }]);
        } else {
            this.r = this.p = NaN;
        }
    };
    
    my.NegativeBinomial.create = function(parameters) {
        return new my.NegativeBinomial(parameters);
    };
    
    my.NegativeBinomial.prototype.calculate = function() {
        if (isNaN(this.p) || isNaN(this.r)) return { error: true };
        var result = { parsedInput: "NegBin(" + this.r + ", " + this.p + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "NegBin(r,p)";
            result.paramRules = [{
                paramName: "r",
                description: "integer greater than 0"
            },
            {
                paramName: "p",
                description: "real number between 0 and 1 exclusive"
            }];
            return result;
        }
        
        result.expectedValue = my.round3(this.r / this.p);
        result.variance = my.round3(this.r * (1 - this.p) / (this.p * this.p));
        result.pmf = "<mfenced><mtable>" +
            "<mtr><mtd><mi>i</mi><mo>-</mo><mn>1</mn></mtd></mtr>" +
            "<mtr><mtd><mn>" + my.round3(this.r - 1) + "</mn></mtd></mtr>" +
        "</mtable></mfenced>" +
        "<mn>" + my.round3(Math.pow(this.p, this.r)) +"</mn>" +
        "<msup>" +
            "<mfenced><mn>" + my.round3(1 - this.p) +"</mn></mfenced>" +
            "<mrow><mi>i</mi><mo>-</mo><mn>" + my.round3(this.r) + "</mn></mrow>" +
        "</msup>";
        return result;
    };
    
    return my;
})(CS109 || {});
