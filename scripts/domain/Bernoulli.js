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
        var result = { parsedInput: "Ber(" + my.round3(this.p) + ")" };
        
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
        
        result.expectedValue = my.round3(this.p);
        result.variance = my.round3(this.p * (1 - this.p));
        result.pmf = "<mfenced open='{' close='' separators=''>" +
            "<mtable columnalign='left'>" +
                "<mtr>" +
                    "<mtd><mn>" + my.round3(this.p) + "</mn></mtd>" +
                    "<mtd><mo>if</mo><mi>i</mi><mo>=</mo><mn>1</mn></mtd>" +
                "</mtr>" +
                "<mtr>" +
                    "<mtd><mn>" + my.round3(1 - this.p) + "</mn></mtd>" +
                    "<mtd><mo>if</mo><mi>i</mi><mo>=</mo><mn>0</mn></mtd>" +
                "</mtr>" +
                "<mtr>" +
                    "<mtd><mn>0</mn></mtd>" +
                    "<mtd><mtext>otherwise</mtext></mtd>" +
                "</mtr>"
            "</mtable>" +
        "</mfenced>";
        return result;
    };
    
    return my;
})(CS109 || {});
