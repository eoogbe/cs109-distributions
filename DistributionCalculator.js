var CS109 = (function(my){
    function validateP(p) {
        return p >= 0 && p <= 1;
    }
    
    function validateN(n) {
        return n >= 0;
    }
    
    // Taken from http://stackoverflow.com/a/10454560/830988
    function countDecimals(num) {
        var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { return 0; }
        return Math.max(
            0,
            // Number of digits right of decimal point.
            (match[1] ? match[1].length : 0)
            // Adjust for scientific notation.
            - (match[2] ? +match[2] : 0)
        );
    }
    
    function round3(num) {
        return (countDecimals(num) <= 3) ? num : num.toFixed(3);
    }
    
    my.DistributionCalculator = function(distribution) {
        this.distribution = distribution;
    };
    
    my.DistributionCalculator.prototype.calculate = function() {
        if (this.distribution.startsWith("Ber")) {
            var p = parseFloat(this._getParameters()[0]);
            
            if (isNaN(p)) return { error: true };
            var parsedInput = "Ber(" + p + ")";
            
            if (!validateP(p)) {
                return {
                    parsedInput: parsedInput,
                    error: "probability",
                    format: "Ber(p)"
                };
            }
            
            return {
                parsedInput: parsedInput,
                expectedValue: round3(p),
                variance: round3(p * (1 - p))
            };
        } else if (this.distribution.startsWith("Bin")) {
            var parameters = this._getParameters();
            var n = parseInt(parameters[0].trim());
            var p = parseFloat(parameters[1].trim());
            
            if (isNaN(n) || isNaN(p)) return { error: true };
            var parsedInput = "Bin(" + n + "," + p + ")";
            
            if (!validateN(n)) {
                return {
                    parsedInput: parsedInput,
                    error: "count",
                    format: "Bin(n,p)"
                };
            }
            
            if (!validateP(p)) {
                return {
                    parsedInput: parsedInput,
                    error: "probability",
                    format: "Bin(n,p)"
                };
            }
            
            return {
                parsedInput: parsedInput,
                expectedValue: round3(n * p),
                variance: round3(n * p * (1 - p))
            };
        } else {
            return { error: true };
        }
    };
    
    my.DistributionCalculator.prototype._getParameters = function(){
        var parametersStr = this.distribution.slice(4);
        var delimiter = parametersStr.indexOf(",") >= 0 ? "," : " ";
        return parametersStr.split(delimiter);
    };
    
    return my;
})(CS109 || {});
