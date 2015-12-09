var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
    var gads = document.createElement("script");
    gads.async = true;
    gads.type = "text/javascript";
    var useSSL = "https:" == document.location.protocol;
    gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
    var node =document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(gads, node);
})();

var CFLAdUtility = function() {
    this.network_code = '';
    this.targeting = [];
    this.log_level = 0;

    this.init = function() {
        googletag.cmd.push(function() {
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });

        googletag.cmd.push(function() {    
            var arr_targeting = window.CFLAdUtility.targeting;
            for ( var i = 0; i < arr_targeting.length; i++ ) {
                var key = Object.keys(arr_targeting[i]);
                var val = arr_targeting[i][key];

                googletag.pubads().setTargeting(key[0], [val]);

                window.CFLAdUtility.log('init(): Target ' + key[0] + ' set to ' + [val]);
            }
        });
    }

    this.displayAd = function( ad_unit, div_id, creative_size ) {
        var str_adunit = "/" + this.network_code + "/" + ad_unit;

        googletag.cmd.push(function() {
            googletag.defineSlot(str_adunit, creative_size, div_id).addService(googletag.pubads());
            googletag.display(div_id);
        });

        this.log('displayAd(): Called googletag.defineSlot() for ad unit ' + str_adunit + ' at size [' + creative_size + '] on ID #' + div_id);
        this.log('displayAd(): Called googletag.display() on #' + div_id);
    }

    this.getPageTitleAsKeywords = function() {
        var str_title = document.title;
        str_title = str_title.replace(/^\//, '').replace(/\/$/, '');
        str_title = str_title.replace(/\s+/g, '-').toLowerCase();

        return str_title;
    }

    this.log = function( log_text ) {
        if ( this.log_level >= 1 ) {
            console.log('[CFL AdUtility][' + new Date().toUTCString() + '] ' + log_text);
        }
    }
};