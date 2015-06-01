var CS109 = (function(my){
    var DISTRIBUTIONS = {
        ber: my.Bernoulli,
        bin: my.Binomial,
        poi: my.Poisson,
        geo: my.Geometric,
        hypg: my.Hypergeometric,
        negbin: my.NegativeBinomial,
        uni: my.Uniform,
        n: my.Normal,
        exp: my.Exponential
    };
    
    my.DistributionCalculator = function(input) {
        this.input = input;
    };
    
    my.DistributionCalculator.prototype.calculate = function() {
        var distributionNames = this._getDistribution();
        
        if (distributionNames) {
            var parameters = this._getParameters(distributionNames[0].length);
            var distribution = distributionNames[1].create(parameters);
            
            return distribution.calculate();
        } else {
            return { error: true };
        }
    };
    
    my.DistributionCalculator.prototype._getDistribution = function(){
        var delimiter = this.input.indexOf("(") >= 0 ? "(" : " ";
        var name = this.input.split(delimiter)[0];
        
        for (var abbrev in DISTRIBUTIONS) {
            if (name === abbrev) return [abbrev, DISTRIBUTIONS[abbrev]];
        }
        
        return false;
    };
    
    my.DistributionCalculator.prototype._getParameters = function(startIdx){
        var parametersStr = this.input.slice(startIdx + 1).trim();
        var delimiter = parametersStr.indexOf(",") >= 0 ? "," : " ";
        return parametersStr.split(delimiter);
    };
    
    return my;
})(CS109 || {});
