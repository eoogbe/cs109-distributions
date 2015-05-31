var CS109 = (function(my){
    my.Hypergeometric = function(parameters){
        if (parameters.length === 3) {
            this.n = parseInt(parameters[0].trim());
            this.N = parseInt(parameters[1].trim());
            this.m = parseInt(parameters[2].trim());
            this.validator = new my.Validator([{
                paramName: "n",
                value: this.n,
                typeName: "greater than",
                type: "greaterThan",
                limit: 0
            },
            {
                paramName: "m",
                value: this.m,
                typeName: "greater than",
                type: "greaterThan",
                limit: 0
            },
            {
                paramName: "N",
                value: this.N,
                typeName: "greater than",
                type: "greaterThan",
                limit: this.n
            },
            {
                paramName: "N",
                value: this.N,
                typeName: "greater than",
                type: "greaterThan",
                limit: this.m
            }]);
        } else {
            this.n = this.N = this.m = NaN;
        }
    };
    
    my.Hypergeometric.create = function(parameters) {
        return new my.Hypergeometric(parameters);
    }
    
    my.Hypergeometric.prototype.calculate = function() {
        if (isNaN(this.n) || isNaN(this.N) || isNaN(this.m)) return { error: true };
        var result = { parsedInput: "HypG(" + this.n + ", " + this.N + ", " + this.m + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "HypG(n,N,m)";
            result.paramRules = [{
                paramName: "n",
                description: "integer greater than 0"
            },
            {
                paramName: "N",
                description: "integer greater than <i class='math'>n</i> and <i class='math'>m</i>"
            },
            {
                paramName: "m",
                description: "integer greater than 0"
            }];
            return result;
        }
        
        result.expectedValue = my.round3(this.n * this.m / this.N);
        result.variance = my.round3(this.n * this.m * (this.N - this.n) * (this.N - this.m) / (this.N * this.N * (this.N - 1)));
        result.pmf = "<mfrac>" +
            "<mrow>" +
                "<mfenced><mtable>" +
                    "<mtr><mtd><mn>" + my.round3(this.m) + "</mn></mtd></mtr>" +
                    "<mtr><mtd><mi>i</mi></mtd></mtr>" +
                "</mtable></mfenced>" +
                "<mfenced><mtable>" +
                    "<mtr><mtd><mn>" + my.round3(this.N - this.m) + "</mn></mtd></mtr>" +
                    "<mtr><mtd><mn>" + my.round3(this.n) + "</mn><mo>-</mo><mi>i</mi></mtd></mtr>" +
                "</mtable></mfenced>" +
            "</mrow>" +
            "<mfenced><mtable>" +
                "<mtr><mtd><mn>" + my.round3(this.n) + "</mn></mtd></mtr>" +
                "<mtr><mtd><mi>i</mi></mtd></mtr>" +
            "</mtable></mfenced>" +
        "</mfrac>";
        return result;
    };
    
    return my;
})(CS109 || {});
