# CFL Ads #

This CFL Ads code exists to simplify the method in which ads are zoned and displayed on the CFL network of websites using Google's DoubleClick for Publishers 
(DFP). Crucially, key-value "targets" are set centrally in the page's header HTML to provide expanded information about the page being viewed, and a single-line 
declaration is all that is needed to indicate where and what size an ad should appear in that spot.


## How To Implement ##

1. Upload the files *cfl-ad-rules.js* and *cfl-ad-utility* to a location on your website where they can be loaded on pages.

2. Add the following HTML to within the HEAD tags of your page header:

        <script type="text/javascript" src="cfl-ad-utility.js"></script>
        <script type="text/javascript" src="cfl-ad-rules.js"></script>

   In the above, we: 

	* With the first SCRIPT tag, load our basic JavaScript wrapped class "CFLAdUtility" and make it available for use.
	* With the second SCRIPT tag, set the Network code, debug log level, and determine the ad unit and targeting information for ads displayed on the page 
    using a pre-written list of rules found in the zone_definitions JavaScript array.

3. The next section to make modifications within *cfl-ad-rules.js* is within the ad definitions. A number of sample definitions are defined below:

      zone_definitions.push(new Array( '/*', '', [{'title': obj_adutility.getPageTitleAsKeywords()}, {'site': 'cfl.ca'}], 'cfl.ca' ));
      zone_definitions.push(new Array( '/', '', [{'title': 'home-page'}, {'site': 'cfl.ca'}], 'cfl.ca' ));
      zone_definitions.push(new Array( '/news', '', [{'title': 'news'}, {'site': 'cfl.ca'}], 'cfl.ca' ));
      zone_definitions.push(new Array( '/videos', '', [{'title': 'videos'}, {'site': 'cfl.ca'}], 'cfl.ca' ));
      zone_definitions.push(new Array( '/videos/recaps', '', [{'title': 'videos-recaps'}, {'site': 'cfl.ca'}], 'cfl.ca' ));

   To explain each of the four (assuming the domain name of the website is http://www.cfl.ca/ ):

   * The first definition is a catch-all: The first array value sets what URL to match this rule against; here, we've set "/*", a special value that indicates 
     that this rule should be used for all pages that are not otherwise listed explicitly in this file. The second array parameter is unused. The third array 
     parameter is itself an array, containing the key-value pairs to set for all ads on this page. Here, we set the key "title" to the value of the page's 
     TITLE tag. A second key "site" is also set with the value "cfl.ca". Finally, the four array parameters indicates that these rules should only be executed 
     on the domain 'cfl.ca'.

   * The second definition affects the home page of the website, and tells AdUtility set a key-value with the key "title" and value of "home-page". This 
     definition should always exist, as all sites have a home page living at the root of the domain. A "site" key/value is also set, and this rule also only 
     executes on the 'cfl.ca' domain.

   * The second definition affects the page at the URL of http://www.cfl.ca/news/ , and tells AdUtility set a key-value with the key "title" and value 
     of "news". A "site" key/value is also set, and this rule also only executes on the 'cfl.ca' domain.

   * The third definition is part of a set of two: This definition is for the page that lives at http://www.cfl.ca/videos/ . Key-values and domain-specific 
     execution are as have followed previously.

   * The fourth definition the the second rule that defines a page within /videos/ ; this rule specifically affects http://www.cfl.ca/videos/recaps/ , and thus 
     allow for that page to be specifically targeted with the key "title" and value "videos-recaps".

    These examples should cover all cases in which ad unit declarations are required. Add, remove and modify the sample modifications as needed for 
    the site in question. Finish by re-uploading the updated *cfl-ad-rules.js* to your website so it can be retrieved by any site visitor.

4. All that's left now is to actual place ads throughout your web page templates. This simply takes a snippet of HTML and JavaScript placed directly where the 
   ad should appear. A "big box" (300px x 250px) ad is displayed using:

		<div id="ad_bigbox">
   			<script>
            window.CFLAdUtility.displayAd('CFL_Network_BigBox', 'ad_bigbox', [300, 250]);
        </script>
		</div>

   A "leaderboard" (728px x 90px) ad is declared with:

		<div id="ad_leaderboard">
        <script>
            window.CFLAdUtility.displayAd('CFL_Network_Leaderboard_Desktop_and_Mobile', 'ad_leaderboard', [728, 90]);
        </script>
    </div>

   That's it! Two small but important notes to finish up:

   * Make sure the ID attribute of the DIV tag matches the second parameter of the insertAd() function call.
   * If you have multiple ads of the same type on a page, make sure the ID attribute of each ad's DIV tag is unique, and that the first parameter of 
     the displayAd() function call matches it. Use "ad_bigbox_1", "ad_bigbox_2" and so on an one example.

A simple example implementation can be viewed in the file index.html in this repository.


## References ##

* https://support.google.com/dfp_premium/answer/1638622?hl=en&ref_topic=28788&vid=1-635810432429457623-2423267530
* https://support.google.com/dfp_premium/answer/1697712?vid=1-635810490298858108-2423267530#sequential
* https://support.google.com/dfp_sb/answer/1698183?hl=en
