$(function(){
    $("#distribution-form").submit(function(e){
        e.preventDefault();
        
        var distribution = $("#distribution").val().trim();
        var distributionCalculator = new CS109.DistributionCalculator(distribution);
        var results = distributionCalculator.calculate();
        var view = new CS109.ResultsView(results, $("#results"));
        view.render();
    });
});
