'use strict';

$.fn.mjSlider = function(config) {

	var i = 0,
		$slider = this,
		$slides = $slider.children(),
		$links,
		loop,
		options = {
			interval: 5000,
			showNav: true,
			showArrows: true,
		};

	// Accept config, fall back to defaults
	if (typeof config === 'object') {
		options.interval 	= config.interval 	|| options.interval;
		options.showNav  	= config.showNav 	|| options.showNav;
		options.showArrows  = config.showArrows || options.showArrows;
	} 

	// This is the main function for looping through the slides.
	function init() {

		loop = setInterval(function() {

			$slides.eq(i).fadeOut();

			$links.removeClass('mj-slider_current-link');

			i = i === $slides.length - 1 ? 0 : i + 1;

			$slides.eq(i).fadeIn();

			$links.eq(i).addClass('mj-slider_current-link');

		}, options.interval);
	}

	// This cancels the current loop, shows the slide you want to jump to, and then starts looping from there.
	$slider.jumpTo = function(index) {

		clearInterval(loop);

		$slides.eq(i).fadeOut();

		$links.removeClass('mj-slider_current-link');

		i = index;

		$slides.eq(i).fadeIn();

		$links.eq(i).addClass('mj-slider_current-link');

		init();
	};

	// Add navigation links so you can jump to a slide
	if (options.showNav) {

		var links = '<a class="mj-slider_current-link"></a>';

		for (var j = 1; j < $slides.length; j++) {
			links += '<a></a>';
		}

		$slider.append('<div class="mj-slider_links">' + links + '</div>');
	}

	$links = $slider.find('.mj-slider_links a');

	// Add the next/previous arrows
	if (options.showArrows) {

		$slider.append('<a class="mj-slider_arrow mj-slider_prev"></a><a class="mj-slider_arrow mj-slider_next"></a>');
	}

	// Show the first slide
	$slides.eq(0).show();

	init();

	// Bind events to the buttons we've created
	$links.on('click', function(e) {
		$slider.jumpTo($(e.target).index());
	});

	$slider.children('.mj-slider_prev').on('click', function() {
		$slider.jumpTo(i === 0 ? $slides.length - 1 : i - 1);
	});

	$slider.children('.mj-slider_next').on('click', function() {
		$slider.jumpTo(i === $slides.length - 1 ? 0 : i + 1);
	});

	$slider.destroy = function() {

		clearInterval(loop);

		$slider.children('.mj-slider_links, .mj-slider_arrow').remove();

		$slider.removeData();
	};

	return $slider;

};