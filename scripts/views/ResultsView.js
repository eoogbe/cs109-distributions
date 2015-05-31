var CS109 = (function(my){
    RESULTS_HEADINGS = [
        { key: "parsedInput", name: "Input" },
        { key: "expectedValue", name: "Expected Value" },
        { key: "variance", name: "Variance" }
    ];
    
    ERROR_MESSAGES = {
        probability: function(paramName, format) {
            return "<p>" + paramName + " must be a real number between 0 and 1 inclusive</p><p>Format: " + format + "</p>";
        },
        positive: function(paramName, format) {
            return "<p>" + paramName + " must be a natural number greater than 0</p><p>Format: " + format + "</p>";
        }
    };
    
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
    
    my.ResultsView = function(model, sel){
        this.model = model;
        this.sel = sel;
    };
    
    my.ResultsView.prototype._appendRow = function(heading, data) {
        this.sel.find("tbody").append("<tr><th scope='row'>" + heading + "</th><td>" + data + "</td></tr>");
    }
    
    my.ResultsView.prototype.render = function() {
        $tbody = this.sel.find("tbody")
        $tbody.html("");
        
        for (var i = 0; i < RESULTS_HEADINGS.length; ++i) {
            var heading = RESULTS_HEADINGS[i];
            var value = this.model[heading.key];
            if (typeof value === "number") value = round3(value);
            if (typeof value !== "undefined") this._appendRow(heading.name, value);
        }
        
        if (this.model.error) {
            var messageFn = ERROR_MESSAGES[this.model.error.type];
            
            if (messageFn) {
                this._appendRow("Error", messageFn(this.model.error.paramName, this.model.format));
            } else {
                this._appendRow("Error", "<p>Could not parse input</p><p>Example: Ber(" + Math.random().toFixed(3) + ")</p>");
            }
        }
        
        $("#results").show();
    };
    
    return my;
})(CS109 || {});
