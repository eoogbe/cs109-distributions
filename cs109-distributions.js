$(function(){
    $("#distribution-form").submit(function(){
        var parameters = +$("#parameters").val();
        if (isNaN(parameters)) {
            $("#results").html("<p>Could not interpret your input.</p>");
        } else {
            $("#results").html("<dl><dt>Expected Value</dt><dd>" + parameters + "</dd></dl>");
        }
        $("#results").show();
        return false;
    });
});
