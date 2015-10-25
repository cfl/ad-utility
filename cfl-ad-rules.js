var str_ad_network_code = '8019';
var str_ad_log_level = 1;

if ( typeof(adZone) == 'undefined' ) {
	var adZone = function() {
		var str_zonedata = '';
		var arr_targets = [];
		var zone_definitions = new Array();

		zone_definitions.push(new Array( '/', 'cfl_network_web/CFL/homepage', [{'Zone': ['main', '/']}, {'Page': '/'}] ));
		zone_definitions.push(new Array( '/standings', 'cfl_network_web/CFL/standings', [{'Zone': ['standings', '/standings']}, {'Page': '/standings'}] ));
		zone_definitions.push(new Array( '/standings/*', 'cfl_network_web/CFL/standings', [{'Zone': ['standings', '/standings']}, {'Page': '/standings'}] ));
		zone_definitions.push(new Array( '/standings/2015/reg', 'cfl_network_web/CFL/standings', [{'Zone': ['standings', '/standings/2015/reg']}, {'Page': '/standings/2015/reg'}] ));
		zone_definitions.push(new Array( '/', 'cfl_network_web/TOR', [{'Zone': ['main', '/']}, {'Page': '/'}], 'argonauts.ca' ));

		var str_path = window.location.pathname;
		var str_domain = window.location.host;
		str_path = str_path.replace(/http(s|)\:\/\//g, '/');
		str_path = str_path.replace(/^\//, '').replace(/\/$/, '');
		str_path = str_path.toLowerCase();
		var arr_path = str_path.split('/');
		if ( arr_path.length > 0 ) {
			var int_sizedefs = zone_definitions.length;
			for ( var i = 0; i < int_sizedefs; i++ ) {
				var arr_zoneurl = zone_definitions[i][0].replace(/^\//, '').replace(/\/$/, '').split('/');
				var keep_matching = true;
				var last_section_matches = false;
				
				if ( typeof zone_definitions[i][3] !== 'undefined' ) {
					if ( str_domain.indexOf(zone_definitions[i][3]) == -1 ) {
						keep_matching = false;
					}
				}

				for ( var j = 0; j < arr_path.length && keep_matching == true; j++ ) {
					if ( arr_zoneurl[j] == arr_path[j] || arr_zoneurl[j] == '*' ) {
						if ( j == (arr_zoneurl.length - 1) ) {
							last_section_matches = true;
						}
					}
					else {
						keep_matching = false;
					}
				}
				
				if ( last_section_matches == true ) {
					str_zonedata = zone_definitions[i][1];
					arr_targets = zone_definitions[i][2];
				}
			}
		}
		
		return (new Array(str_zonedata, arr_targets));
	};
}
var arr_zone_data = adZone();

window.CFLAdUtility = new CFLAdUtility();
window.CFLAdUtility.log_level = str_ad_log_level;
window.CFLAdUtility.network_code = str_ad_network_code;
window.CFLAdUtility.ad_unit = arr_zone_data[0];
window.CFLAdUtility.targeting = arr_zone_data[1];
window.CFLAdUtility.init();