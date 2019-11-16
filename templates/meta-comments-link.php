<?php
/**
 * Post comments link template part.
 *
 * 🚫🚫🚫
 * DO NOT EDIT THIS FILE WHILE INSIDE THE PLUGIN! Changes You make will be lost when a new version
 * of the AMP plugin is released. You need to copy this file out of the plugin and put it into your
 * custom theme, for example. To learn about how to customize these Reader-mode AMP templates, please
 * see: https://amp-wp.org/documentation/how-the-plugin-works/classic-templates/
 * 🚫🚫🚫
 *
 * @package AMP
 */

/**
 * Context.
 *
 * @var AMP_Post_Template $this
 */

?>
<?php if ( comments_open() || get_comment_count() > 0 ) : ?>
	<div class="amp-wp-meta amp-wp-comments-link">
		<a href="<?php echo esc_url( get_comments_link( get_the_ID() ) ); ?>">
			<?php echo esc_html( $this->get( 'comments_link_text' ) ); ?>
		</a>
	</div>
<?php endif; ?>
