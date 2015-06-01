var CS109 = (function(my){
    my.Uniform = function(parameters){
        if (parameters.length === 2) {
            this.alpha = parseFloat(parameters[0].trim());
            this.beta = parseFloat(parameters[1].trim());
            this.validator = new my.Validator([{
                paramName: "&beta;",
                value: this.beta,
                typeName: "greater than",
                type: "greaterThan",
                limit: this.alpha
            }]);
        } else {
            this.alpha = this.beta = NaN;
        }
    };
    
    my.Uniform.create = function(parameters) {
        return new my.Uniform(parameters);
    }
    
    my.Uniform.prototype.calculate = function() {
        if (isNaN(this.alpha) || isNaN(this.beta)) return { error: true };
        var result = { parsedInput: "Uni(" + my.round3(this.alpha) + "," + my.round3(this.beta) + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Uni(&alpha;, &beta;)";
            result.paramRules = [{
                paramName: "&alpha;",
                description: "real number"
            },
            {
                paramName: "&beta;",
                description: "real number greater than <i class='math'>&alpha;</i>"
            }];
            return result;
        }
        
        result.expectedValue = my.round3((this.alpha + this.beta) / 2);
        result.variance = my.round3((this.beta - this.alpha) * (this.beta - this.alpha) / 12);
        result.pdf = "<mfenced open='{' close='' separators=''>" +
            "<mtable columnalign='left'>" +
                "<mtr>" +
                    "<mtd>" +
                        "<mfrac>" +
                            "<mn>1</mn>" +
                            "<mn>" + my.round3(this.beta - this.alpha) + "</mn>" +
                        "</mfrac>" +
                    "</mtd>" +
                    "<mtd>" +
                        "<mo>if</mo><mn>" + my.round3(this.alpha) + "</mn>" +
                        "<mo>&le;</mo><mi>x</mi><mo>&le;</mo>" +
                        "<mn>" + my.round3(this.beta) + "</mn>" +
                    "</mtd>" +
                "</mtr>" +
                "<mtr>" +
                    "<mtd><mn>0</mn></mtd>" +
                    "<mtd><mtext>otherwise</mtext></mtd>" +
                "</mtr>" +
            "</mtable>" +
        "</mfenced>";
        return result;
    };
    
    return my;
})(CS109 || {});
