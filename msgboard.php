<?php 
/*
Template Name: 留言板 (请打开页面的评论功能)
*/
?>

<?php get_header(); ?>

<div class="page-information-card-container"></div>

<?php get_sidebar(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page' );

			if (get_option("argon_show_sharebtn") != 'false') {
				get_template_part( 'template-parts/share' );
			}

			if (get_option("argon_show_followbtn") != 'false') {
				get_template_part( 'template-parts/follow' );
			}

			if (comments_open() || get_comments_number()) {
				comments_template();
			}

		endwhile;
		?>
<style>
#main article {
	display: none !important;
}
#share_container {
	display: none;
}
#follow_container {
	display: none;
}
.comments-area .comments-title {
	font-size: 0px;
}
.comments-area .comments-title:after {
	content: '<?php _e("留言板", 'argon'); ?>';
	font-size: 20px;
}
.comments-area .comments-title i {
	font-size: 20px;
	margin-right: 10px;
}
.post-comment-title {
	font-size: 0px;
}
.post-comment-title:after {
	content: '<?php _e("发送留言", 'argon'); ?>';
	font-size: 20px;
}
.post-comment-title i {
	font-size: 20px;
	margin-right: 10px;
}
</style>
<?php get_footer(); ?>