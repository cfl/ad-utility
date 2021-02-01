# CFL Ads #

This CFL Ads code exists to simplify the method in which ads are zoned and displayed on the CFL network of websites using Google's DoubleClick for Publishers 
(DFP). Crucially, the ad unit / "zone" to is set centrally in the page's header HTML, and a single-line declaration is placed within the page's HTML to indicate 
where and what size an ad should appear in that spot.


## How To Implement ##

1. Upload the files *cfl-ad-rules.js* and *cfl-ad-utility* to a location on your website where they can be loaded on pages.

2. Add the following HTML to within the HEAD tags of your page header:

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

        zone_definitions.push(new Array( '/*', '', [{'title': obj_adutility.getPageTitleAsKeywords()}, {'site': 'cfl.ca'}], 'cfl.ca' ));
        zone_definitions.push(new Array( '/', '', [{'title': 'home-page'}, {'site': 'cfl.ca'}], 'cfl.ca' ));
        zone_definitions.push(new Array( '/schedule', '', [{'title': 'schedule'}, {'site': 'cfl.ca'}], 'cfl.ca' ));
        zone_definitions.push(new Array( '/schedule/*', '', [{'title': 'schedule-all-seasons'}, {'site': 'cfl.ca'}], 'cfl.ca' ));
        zone_definitions.push(new Array( '/', '', [{'title': 'home-page'}, {'site': 'argonauts.ca'}], 'argonauts.ca' ));

   To explain each of the five (assuming the domain name of the website is https://www.cfl.ca/ ):

   * The first definition is a catch-all rule (denoted by "/*" as the 'path' value) which tells AdUtility that if no other definitions have been 
     applied, set the key-value key of "title" to the page path (the URL https://www.cfl.ca/category/2021-free-agency/ would get "2021-free-agency" 
     set), and a key-value key of "site" would be set to "cfl.ca". Also, by default, a key-value key of "pathname" is always set (the URL 
     https://www.cfl.ca/category/2021-free-agency/ would get "/category/2021-free-agency/" set). Finally, the last array element indicates this rule 
     should only take effect if the domain ends in "cfl.ca".

   * The second definition affects the home page of the website, and tells AdUtility to set a targeting key-value key of "title" to "home-page", a 
     key-value key of "site" to "cfl.ca", and by default, a key-value key of "pathname" will be set to "/". Finally, the last array element indicates 
     this rule should only take effect if the domain ends in "cfl.ca". "Page". This definition should always exist, as all sites have a home page 
     living at the root of the domain that will require targeting at some point.

   * The third definition declares that at the URL of "/schedule", the key-value target data should consist of "title" = "schedule", "site" = "cfl.ca", 
     "pathname" = "/schedule/" (by default), and apply only if the domain ends in "cfl.ca". 

   * The fourth definition is a special catch-all: For all pages that have a URL starting with /schedule/ but otherwise don't have a specific 
     definition in this file, default to setting the targeting data of "title" = "schedule-all-seasons", "site" = "cfl.ca", "pathname" = "/schedule/" 
     (by default), and apply only if the domain ends in "cfl.ca". .

   * The fifth definition resembles the first in our list of examples, but will only be applied if the current domain name ends with argonauts.ca.

     These five examples should cover all cases in which ad unit declarations are required. Add, remove and modify the sample modifications as needed for 
     the site in question. Finish by re-uploading the updated *cfl-ad-rules.js* to your website so it can be retrieved by any site visitor.

6. All that's left now is to actual place ads throughout your web page templates. This is just a little snippet of HTML and JavaScript placed directly
   where the ad should appear. A "big box" (300px x 250px) ad is displayed using:

		<div id="ad_bigbox">
   			<script>
                window.CFLAdUtility.displayAd('CFL_Network_BigBox', 'ad_bigbox', [300, 250]);
            </script>
		</div>

   A "leaderboard" (728px x 90px) ad is declared with:

		<div id="ad_bigbox">
            <script>
                window.CFLAdUtility.displayAd('CFL_Network_Leaderboard_Desktop_and_Mobile', 'ad_bigbox', [728, 90]);
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
