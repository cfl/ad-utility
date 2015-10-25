# CFL Ads #

This CFL Ads code exists to simplify the method in which ads are zoned and displayed on the CFL network of websites using Google's DoubleClick for Publishers 
(DFP). Crucially, the ad unit / "zone" to is set centrally in the page's header HTML, and a single-line declaration is placed within the page's HTML to indicate 
where and what size an ad should appear in that spot.


## How To Implement ##

1. Upload the files *cfl-ad-rules.js* and *cfl-ad-utility* to a location on your website where they can be loaded on pages.

2. Add the following HTML to within the HEAD tags of your page header:

        <script type="text/javascript">
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
        </script>
        <script type="text/javascript" src="cfl-ad-utility.js"></script>
        <script type="text/javascript" src="cfl-ad-rules.js"></script>

In the above, we: 

* Within the first SCRIPT tag, load the standard ad code library provided by Google DFP.
* With the second SCRIPT tag, load our basic JavaScript wrapped class "CFLAdUtility" and make it available for use.
* With the third SCRIPT tag, set the Network code, debug log level, and determine the ad unit and targeting information for ads displayed on the page 
  using a pre-written list of rules found in the zone_definitions JavaScript array.

3. Diving further into *cfl-ad-rules.js*, we need to first modify the value of *str_ad_network_code* to reflect the DFP network code for our website(s). 

4. Next, update the value of *str_ad_log_level* to contain a value from 0 to 3. A value of 0 will disable all debug log messages, while a value of 1 
   or greater will output helpful debug messages to the browser JavaScript console window.

5. The next section to make modifications within *cfl-ad-rules.js* is within the ad definitions. A number of sample definitions have been left in 
   the file:

		zone_definitions.push(new Array( '/', 'cfl_network_web/CFL/homepage', [{'Zone': ['main', '/']}, {'Page': '/'}] ));
		zone_definitions.push(new Array( '/standings', 'cfl_network_web/CFL/standings/hub_page', [{'Zone': ['standings', '/standings']}, {'Page': '/standings'}] ));
		zone_definitions.push(new Array( '/standings/*', 'cfl_network_web/CFL/standings', [] ));
		zone_definitions.push(new Array( '/standings/2015/reg', 'cfl_network_web/CFL/standings/2015', [{'Zone': ['standings', '/standings/2015/reg']}, {'Page': '/standings/2015/reg'}] ));
		zone_definitions.push(new Array( '/', 'cfl_network_web/TOR', [{'Zone': ['main', '/']}, {'Page': '/'}], 'argonauts.ca' ));

   To explain each of the five (assuming the domain name of the website is http://www.cfl.ca/ ):

   * The first definition affects the home page of the website, and tells AdUtility to set an ad unit of "homepage", and targeting data for "Zone" and 
     "Page". This definition should always exist, as all sites have a home page living at the root of the domain.

   * The second definition is part of a set of three: This definition declares what the ad unit ("cfl_network_web/CFL/standings/hub_page") and target data 
     (for "Zone" and for "Page") the page that lives at http://www.cfl.ca/standings should use.

    * The third definition is a catch-all: For all pages that have a URL starting with /standings/ but otherwise don't have a specific definition in 
      this file, default to setting an ad unit of "cfl_network_web/CFL/standings", and use no targeting data.

    * The fourth definition declares a specific ad unit ("cfl_network_web/CFL/standings/2015") and targeting data for the exact URL of the site of 
      http://www.cfl.ca/standings/2015/reg . 

    * The fifth definition resembles the first in our list of examples, but will only be applied if the current domain name ends with argonauts.ca.

    These five examples should cover all cases in which ad unit declarations are required. Add, remove and modify the sample modifications as needed for 
    the site in question. Finish by re-uploading the updated *cfl-ad-rules.js* to your website so it can be retrieved by any site visitor.

6. All that's left now is to actual place ads throughout your web page templates. This is just a little snippet of HTML and JavaScript placed directly
   where the ad should appear. A "big box" (300px x 250px) ad is displayed using:

		<div id="ad_bigbox">
   			<script>
                window.CFLAdUtility.displayAd('ad_bigbox', [300, 250]);
            </script>
		</div>

   A "leaderboard" (728px x 90px) ad is declared with:

		<div id="ad_bigbox">
            <script>
                window.CFLAdUtility.displayAd('ad_bigbox', [300, 250]);
            </script>
        </div>

   A "multi-ad" (allowing a 300px x 250px, 160px x 600px, or 300px x 600px size) ad is declared with:

   		<div id="ad_multiad">
            <script>
                window.CFLAdUtility.displayAd('ad_multiad', [ [300, 250], [160, 600], [300, 600] ]);
            </script>
        </div>

   That's it! Two small but important notes to finish up:

   * Make sure the ID attribute of the DIV tag matches the first parameter of the insertAd() function call.
   * If you have multiple ads of the same type on a page, make sure the ID attribute of each ad's DIV tag is unique, and that the first parameter of 
     the displayAd() function call matches it. Use "ad_bigbox_1", "ad_bigbox_2" and so on an one example.

A simple example implementation can be viewed in the file index.html in this repository.


## References ##

* https://support.google.com/dfp_premium/answer/1638622?hl=en&ref_topic=28788&vid=1-635810432429457623-2423267530
* https://support.google.com/dfp_premium/answer/1697712?vid=1-635810490298858108-2423267530#sequential
* https://support.google.com/dfp_sb/answer/1698183?hl=en