<?php
/*
 Plugin Name: AdUtility
 Plugin URI: https://github.com/cfl/cfl_sites/tree/master/plugins/ad-utility/
 Description: Allows some advanced targeting of Google DFP ads to the Article, Video and Page post types.
 Author: Sully Syed
 Version: 1.0.0
 Author URI: http://www.cfl.ca/
 */

class CFLAdUtility {
	public static function init() {
		// Add our Ads metabox to a few post types.
		add_action( 'add_meta_boxes', array('CFLAdUtility', 'add_meta_boxes') );

		// Save the contents of our Ads metabox.
		add_action( 'save_post', array('CFLAdUtility', 'save_post') );

		// Inject post-specific ad rules into the header.
		add_action( 'wp_head', array('CFLAdUtility', 'wp_head') );
	}

	public static function add_meta_boxes() {
		add_meta_box( 'ad-utility-metabox', 'Ads', array('CFLAdUtility', 'display_ads_metabox'), 'post', 'side', 'default' );
		add_meta_box( 'ad-utility-metabox', 'Ads', array('CFLAdUtility', 'display_ads_metabox'), 'bc-video', 'side', 'default' );
    	add_meta_box( 'ad-utility-metabox', 'Ads', array('CFLAdUtility', 'display_ads_metabox'), 'page', 'side', 'default' );
	}

	public static function display_ads_metabox( $post ) {
		$ads_run_only_exclusives = (int) get_post_meta($post->ID, 'ads_run_only_exclusives', true);

		$str_permalink = get_permalink($post->ID);
		$keywords = CFLAdUtility::get_page_url_as_keywords($str_permalink);

		if ( $post->post_status != 'publish' ) {
			$keywords = 'None; publish to see keywords.';
		}
		?>
		<div class="inside">
			<p>The Google DFP key-value key of <b>title</b> will be set to value shown below:</p>

			<p>
				<input type="text" name="" class="form-input-tip" value="<?php echo $keywords; ?>" readonly="readonly" style="width: 100%; font-size: 12px;">
			</p>

			<p>
				By default, the ads shown on this page will include any of the ads meant for this site ("Run Of Site"). To allow only the ads exclusively targeted 
				for this page to be displayed, set the option below to <b>Only ads for this page</b>.
			</p>

			<p>
				<select name="ads_run_only_exclusives">
					<option value="0" <?php selected( $ads_run_only_exclusives, 0 ); ?>>All ads on this site</option>
					<option value="1" <?php selected( $ads_run_only_exclusives, 1 ); ?>>Only ads for this page</option>
				</select>
			</p>
		</div>
		<?php
	}

	// Actually save the values of the "Ads" metabox as post metadata.
	public static function save_post( $post_id ) {
	    // Bail if we're doing an auto save.
	    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;

	    // If our current user can't edit this post, bail.
	    if ( !current_user_can( 'edit_posts' ) ) return;

	    if( isset( $_POST['ads_run_only_exclusives'] ) ) {
	        update_post_meta( $post_id, 'ads_run_only_exclusives', $_POST['ads_run_only_exclusives'] );
	    }
	}

	public static function get_page_url_as_keywords( $str_path ) {
        $str_path = preg_replace('/http(s|)\:\/\//', '/', $str_path);
        $str_path = preg_replace('/^\//', '', $str_path);
        $str_path = strtolower($str_path);
        $str_path = rtrim($str_path, '/');

 		$arr_path = explode('/', $str_path);

        $str_content_slug = $arr_path[sizeof($arr_path) - 1];

        return $str_content_slug;
	}

	public static function wp_head() {
		global $post;

		if ( is_null($post) ) {
			return;
		}

		if ( !is_page() && !is_single() ) {
			return;
		}

		$ads_run_only_exclusives = (int) get_post_meta($post->ID, 'ads_run_only_exclusives', true);

		if ( $ads_run_only_exclusives == 1 ) {
			?>
			<script> window.disable_cfl_adutility_targets = new Array('site'); </script>
			<?php
		}
	}
}


CFLAdUtility::init();
?>