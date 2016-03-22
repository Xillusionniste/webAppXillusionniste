'use strict';

// Declare app level module which depends on views, and components
app.filter('myFormat', function() {
    return function(x) {
        var i, c, txt = "";
        x = x.split("");
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i % 2 == 0) {
                c = c.toUpperCase();
            }
            txt += c;
        }
        return txt;
    };
});
