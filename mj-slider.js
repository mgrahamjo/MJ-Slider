$(function(){
	var i = 0;
	$('.mj-slider').hide().prepend('<div class="mj-links"></div>');
	$('.mj-links').each(function(){
		$('.mj-links').append('<a></a>');
		$(this).children().last().addClass('current');
	})
	$('.mj-slider').eq(0).show();
	var loop = setInterval(function(){
		$('.mj-slider').eq(i).fadeOut();
		i = i === $('.mj-slider').length - 1 ? 0 : i + 1;
		$('.mj-slider').eq(i).fadeIn();
	}, 6000);
	$('.mj-links a').click(function(){
		clearInterval(loop);
		$('.mj-slider').fadeOut();
		$('.mj-slider').eq($(this).index()).fadeIn();
	});
});