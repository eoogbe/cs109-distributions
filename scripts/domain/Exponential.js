var CS109 = (function(my){
    my.Exponential = function(parameters){
        if (parameters.length === 1) {
            this.lambda = parseFloat(parameters[0].trim());
            this.validator = new my.Validator([{
                paramName: "&lambda;",
                value: this.lambda,
                typeName: "greater than",
                type: "greaterThan",
                limit: 0
            }]);
        } else {
            this.lambda = NaN;
        }
    };
    
    my.Exponential.create = function(parameters) {
        return new my.Exponential(parameters);
    }
    
    my.Exponential.prototype.calculate = function() {
        if (isNaN(this.lambda)) return { error: true };
        var result = { parsedInput: "Exp(" + my.round3(this.lambda) + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Exp(&lambda;)";
            result.paramRules = [{
                paramName: "&lambda;",
                description: "real number greater than 0"
            }];
            return result;
        }
        
        result.expectedValue = my.round3(1 / this.lambda);
        result.variance = my.round3(1 / (this.lambda * this.lambda));
        result.pdf = "<mfenced open='{' close='' separators=''>" +
            "<mtable columnalign='left'>" +
                "<mtr>" +
                    "<mtd>" +
                        "<mn>" + my.round3(this.lambda) + "</mn>" +
                        "<mo>&InvisibleTimes;</mo>" +
                        "<msup>" +
                            "<mi>e</mi>" +
                            "<mrow>" +
                                "<mn>" + my.round3(-this.lambda) + "</mn><mo>&InvisibleTimes;</mo><mi>x</mi>" +
                            "</mrow>" +
                        "</msup>" +
                    "</mtd>" +
                    "<mtd>" +
                        "<mo>if</mo>" +
                        "<mi>x</mi><mo>&ge;</mo><mn>0</mn>" +
                    "</mtd>" +
                "</mtr>" +
                "<mtr>" +
                    "<mtd><mn>0</mn></mtd>" +
                    "<mtd><mtext>otherwise</mtext></mtd>" +
                "</mtr>" +
            "</mtable>" +
        "</mfenced>";
        console.log(result.pdf);
        return result;
    };
    
    return my;
})(CS109 || {});
