$(function(){
    var exampleView = new CS109.ExampleView("#example");
    var resultsView = new CS109.ResultsView("#results");
    exampleView.nextExample();
    
    $("#distribution-form").submit(function(e){
        e.preventDefault();
        
        var distribution = $("#distribution").val().trim().toLowerCase();
        var distributionCalculator = new CS109.DistributionCalculator(distribution);
        var results = distributionCalculator.calculate();
        resultsView.render(results);
        exampleView.render(results);
    });
});
