var CS109 = (function(my){
    my.Normal = function(parameters){
        if (parameters.length === 2) {
            this.mu = parseFloat(parameters[0].trim());
            this.sigmaSq = parseFloat(parameters[1].trim());
            this.validator = new my.Validator([{
                paramName: "&sigma;<sup>2</sup>",
                value: this.sigmaSq,
                typeName: "at least",
                type: "atLeast",
                limit: 0
            }]);
        } else {
            this.mu = this.sigmaSq = NaN;
        }
    };
    
    my.Normal.create = function(parameters) {
        return new my.Normal(parameters);
    }
    
    my.Normal.prototype.calculate = function() {
        if (isNaN(this.mu) || isNaN(this.sigmaSq)) return { error: true };
        var result = { parsedInput: "N(" + my.round3(this.mu) + "," + my.round3(this.sigmaSq) + ")" };
        
        var error = this.validator.validate();
        if (error) {
            result.error = error;
            result.format = "N(&mu;, &sigma;<sup>2</sup>)";
            result.paramRules = [{
                paramName: "&mu;",
                description: "real number"
            },
            {
                paramName: "&sigma;<sup>2</sup>",
                description: "positive real number"
            }];
            return result;
        }
        
        result.expectedValue = my.round3(this.mu);
        result.variance = my.round3(this.sigmaSq);
        result.pdf = "<mrow>" +
            "<mn>" + my.round3(1 / Math.sqrt(this.sigmaSq * 2 * Math.PI)) + "</mn>" +
            "<mo>&InvisibleTimes;</mo>" +
            "<msup>" +
                "<mi>e</mi>" +
                "<mfrac bevelled='true'>" +
                    "<mrow>" +
                        "<mo>&minus;</mo>" +
                        "<mo>&InvisibleTimes;</mo>" +
                        "<msup>" +
                            "<mfenced separators=''>" +
                                "<mi>x</mi><mo>&minus;</mo><mn>" + my.round3(this.mu) + "</mn>" +
                            "</mfenced>" +
                            "<mn>2</mn>" +
                        "</msup>" +
                    "</mrow>" +
                    "<mn>" + my.round3(2 * this.sigmaSq) + "</mn>" +
                "</mfrac>" +
            "</msup>" +
        "</mrow>";
        return result;
    };
    
    return my;
})(CS109 || {});
