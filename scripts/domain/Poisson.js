var CS109 = (function(my){
    my.Poisson = function(parameters){
        if (parameters.length === 1) {
            this.lambda = parseFloat(parameters[0].trim());
            this.validator = new my.Validator([{
                paramName: "&lambda;",
                value: this.lambda,
                typeName: "at least",
                type: "atLeast",
                limit: 0
            }]);
        } else {
            this.lambda = NaN;
        }
    };
    
    my.Poisson.create = function(parameters) {
        return new my.Poisson(parameters);
    }
    
    my.Poisson.prototype.calculate = function() {
        if (isNaN(this.lambda)) return { error: true };
        var result = { parsedInput: "Poi(" + my.round3(this.lambda) + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "Poi(&lambda;)";
            result.paramRules = [{
                paramName: "&lambda;",
                description: "positive real number"
            }];
            return result;
        }
        
        result.expectedValue = my.round3(this.lambda);
        result.variance = my.round3(this.lambda);
        result.pmf = "<mfenced open='{' close='' separators=''>" +
            "<mtable columnalign='left'>" +
                "<mtr>" +
                    "<mtd>" +
                        "<msup>" +
                            "<mi>e</mi>" +
                            "<mn>" + my.round3(-this.lambda) + "</mn>" +
                        "</msup>" +
                        "<mo>&InvisibleTimes;</mo>" +
                        "<mfrac>" +
                            "<msup>" +
                                "<mn>" + my.round3(this.lambda) + "</mn>" +
                                "<mi>i</mi>" +
                            "</msup>" +
                            "<mrow><mi>i</mi><mo>!</mo></mrow>" +
                        "</mfrac>" +
                    "</mtd>" +
                    "<mtd>" +
                        "<mo>if</mo><mi>i</mi><mo>&ge;</mo><mn>0</mn>" +
                    "</mtd>" +
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
