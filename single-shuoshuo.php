<?php get_header(); ?>

<div class="page-information-card-container"></div>

<?php get_sidebar(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'shuoshuo-details' );

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

<?php get_footer(); ?>
