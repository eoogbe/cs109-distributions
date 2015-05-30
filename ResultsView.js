var CS109 = (function(my){
    RESULTS_HEADINGS = [
        { key: "parsedInput", name: "Input" },
        { key: "expectedValue", name: "Expected Value" },
        { key: "variance", name: "Variance" }
    ];
    
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
            if (typeof value !== "undefined") this._appendRow(heading.name, value);
        }
        
        if (this.model.error) {
            switch (this.model.error) {
                case "probability":
                    this._appendRow("Error", "<p>p must be a real number between 0 and 1 inclusive</p><p>Format: " + this.model.format + "</p>"); break;
                case "count":
                    this._appendRow("Error", "<p>n must be a natural number greater than 0</p><p>Format: " + this.model.format + "</p>"); break;
                default:
                    this._appendRow("Error", "<p>Could not parse input</p><p>Example: Ber(" + Math.random().toFixed(3) + ")</p>");
            }
        }
        
        $("#results").show();
    };
    
    return my;
})(CS109 || {});
