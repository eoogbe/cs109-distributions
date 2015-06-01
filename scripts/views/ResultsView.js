var CS109 = (function(my){
    var ROWS = [{
        key: "parsedInput",
        heading: "Input"
    },
    {
        key: "expectedValue",
        heading: "Expected Value"
    },
    {
        key: "variance",
        heading: "Variance"
    },
    {
        key: "pmf",
        heading: "Probability Mass Function",
        func: function(pmf){
            return "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
                "<mi>P</mi><mo>&ApplyFunction;</mo><mfenced separators=''><mi>X</mi><mo>=</mo><mi>i</mi></mfenced><mo>=</mo>" + pmf +
            "</math>";
        }
    },
    {
        key: "pdf",
        heading: "Probability Density Function",
        func: function(pdf){
            return "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
                "<mi>f</mi><mo>&ApplyFunction;</mo><mfenced><mi>x</mi></mfenced><mo>=</mo>" + pdf +
            "</math>";
        }
    },
    {
        key: "error",
        heading: "Error",
        func: function(error){
            if (error === true) {
                return "Could not parse input";
            } else {
                return "<i class='math'>" + error.paramName + "</i> must be " + error.typeName + " " + error.limit;
            }
        }
    }];
    
    my.ResultsView = function(sel){
        this.$sel = $(sel);
    };
    
    my.ResultsView.prototype._appendRow = function(heading, data) {
        this.$sel.find("tbody").append("<tr><th scope='row'>" + heading + "</th><td>" + data + "</td></tr>");
    };
    
    my.ResultsView.prototype._renderError = function(error) {
        return "<i class='math'>" + error.paramName + "</i> must be " + error.typeName + " " + error.limit;
    };
    
    my.ResultsView.prototype.render = function(model) {
        this.$sel.find("tbody").html("");
        
        for (var i = 0; i < ROWS.length; ++i) {
            var row = ROWS[i];
            var value = model[row.key];
            
            if (typeof value !== "undefined") {
                var transformFn = row.func || function(data){ return data; };
                this._appendRow(row.heading, transformFn(value));
            }
        }
        
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.$sel.get(0)]);
        this.$sel.show();
    };
    
    return my;
})(CS109 || {});
