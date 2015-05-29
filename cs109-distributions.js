$(function(){
    $("#distribution-form").submit(function(){
        var parameters = +$("#parameters").val();
        
        if (isNaN(parameters)) {
            $("#results").html("<p>Could not interpret your input</p>");
        } else {
            var expectedValue = parameters;
            var variance = parameters * (1 - parameters);
            
            $("#results").html("<dl class='dl-horizontal'>" +
                "<dt>Expected Value</dt>" +
                "<dd>" + expectedValue + "</dd>" +
                "<dt>Variance</dt>" +
                "<dd>" + variance + "</dd>" +
            "</dl>");
        }
        
        $("#results").show();
        
        return false;
    });
});
