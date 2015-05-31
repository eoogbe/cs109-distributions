var CS109 = (function(my){
    RESULTS_HEADINGS = [
        { key: "parsedInput", name: "Input" },
        { key: "expectedValue", name: "Expected Value" },
        { key: "variance", name: "Variance" }
    ];
    
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
        
        for (var i = 0; i < RESULTS_HEADINGS.length; ++i) {
            var heading = RESULTS_HEADINGS[i];
            var value = model[heading.key];
            if (typeof value === "number") value = my.round3(value);
            if (typeof value !== "undefined") this._appendRow(heading.name, value);
        }
        
        if (model.error === true) {
            this._appendRow("Error", "Could not parse input");
        } else if (model.error) {
            this._appendRow("Error", this._renderError(model.error));
        }
        
        this.$sel.show();
    };
    
    return my;
})(CS109 || {});
