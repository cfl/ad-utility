var CFLAdUtility = function() {
    this.network_code = '';
    this.ad_unit = '';
    this.targeting = [];
    this.log_level = 0;

    this.init = function() {
        googletag.cmd.push(function() {
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });

        for ( var i = 0; i < this.targeting.length; i++ ) {
            var key = Object.keys(this.targeting[i]);
            var val = this.targeting[i][key];

            googletag.cmd.push(function() {
                googletag.pubads().setTargeting(key[0], val);
            });

            this.log('init(): Target ' + key[0] + ' set to ' + val);
        }
    }

    this.displayAd = function( div_id, creative_size ) {
        var str_adunit = "/" + this.network_code + "/" + this.ad_unit;

        googletag.cmd.push(function() {
            googletag.defineSlot(str_adunit, creative_size, div_id).addService(googletag.pubads());
            googletag.display(div_id);
        });

        this.log('displayAd(): Called googletag.defineSlot() for ad unit ' + str_adunit + ' at size [' + creative_size + '] on ID #' + div_id);
        this.log('displayAd(): Called googletag.display() on #' + div_id);
    }

    this.log = function( log_text ) {
        if ( this.log_level >= 1 ) {
            console.log('[CFL AdUtility][' + new Date().toUTCString() + '] ' + log_text);
        }
    }
};