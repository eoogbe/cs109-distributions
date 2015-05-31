var CS109 = (function(my){
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
    
    my.round3 = function(num) {
        return (countDecimals(num) <= 3) ? num : num.toFixed(3);
    };
    
    return my;
})(CS109 || {});
