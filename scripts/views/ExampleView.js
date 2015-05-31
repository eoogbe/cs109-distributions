var CS109 = (function(my){
    my.ExampleView = function(sel) {
        this.$sel = $(sel);
    };
    
    my.ExampleView.prototype.nextExample = function() {
        this.$sel.html("<p>Example: Ber(" + CS109.round3(Math.random()) + ")</p>");
        this.$sel.show();
    };
    
    my.ExampleView.prototype._getParamRulesHtml = function(paramRules) {
        var paramRulesHtml = "";
        
        for (var i = 0; i < paramRules.length; ++i) {
            var rule = paramRules[i];
            paramRulesHtml += "<dt><i class='math'>" + rule.paramName + "</i></dt><dd>" + rule.description + "</dd>";
        }
        
        return paramRulesHtml;
    };
    
    my.ExampleView.prototype.render = function(model) {
        if (model.error === true) {
            this.nextExample();
        } else if (model.error) {
            var paramRulesHtml = this._getParamRulesHtml(model.paramRules);
            this.$sel.html("<p>Format: " + model.format + "</p>" +
                "<dl id='param-rules' class='dl-horizontal'>" + paramRulesHtml + "</dl>");
            this.$sel.show();
        } else {
            this.$sel.hide();
        }
    };
    
    return my;
})(CS109 || {});
