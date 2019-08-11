$(function () {
	$('#my-menu').mmenu({
		extensions: ['', 'theme-black', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: '<img src="img/logo-1.svg">'
		},
		offCanvas: {
			position: 'right'
		}
	});

	var API = $("#my-menu").data("mmenu");

	$(".hamburger").click(function () {    //открываем меню по клику на гамбургер
		API.open();
	});

	API.bind("open:finish", function ($panel) {    //в момент завершения анимации открытия меню
		$(".hamburger").addClass('is-active');   //добавляем класс гамбургеру, чтобы он видоизменился
	});

	API.bind("close:finish", function ($panel) {      //в момент завершения анимации закрытия меню
		$(".hamburger").removeClass('is-active');   //добавляем класс гамбургеру, чтобы он видоизменился
	});

	$('.mm-listview li a').bind('click', function (event) {   //Прикрепляем обработчик к событию клика по ссылке в меню
		var $anchor = $(this);                         //записываем ссылку, по которой кликнули в переменную
		API.bind('close:finish', function () {          //Прикрепляем обработчик к событию завершения анимации закрытия меню
			$('html, body').stop().animate({       //функция анимации плавного перехода по якорю
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1000, 'easeInOutExpo');
		});

	});

	$('.carousel-services').on('initialized.owl.carousel', function(){
		setTimeout(function(){
			carouselService()
		}, 100);
		
	});
	$('.carousel-services').owlCarousel({ //активация карусели 
		loop: true, //бесконечная карусель 
		nav: true, // включаем навигацию
		smartSpeed: 700, // скорость прокрутки
		navText:['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'], // меняем текст на иконки
		responsiveClass: true,
		dots: false,
		responsive: { 
			0: {
				items:1
			},
			800: {
				items:2
			},
			1100: {
				items:3
			}
		} // адаптируем под разные экраны
	}); 



	$('.carousel-services-content').equalHeights();

	function carouselService() {
		$('.carousel-services-item').each(function() {
			var ths = $(this),
				thsh = ths.find('.carousel-services-content').outerHeight();
				ths.find('.carousel-services-images').css('min-height, thsh');
		});	
	}carouselService();


	$('.carousel-services-composition .h3').each(function(){
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
	});

	$('section .h2').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
	});

	$('select').selectize({
		create: true,
	});


	$('.reviews').owlCarousel({
		loop:true,
		items:1,
		smartSpeed:700,
		nav:false,
		autoHeight:true

	});

	$('.partners').owlCarousel({
		loop:true,
		items:4,
		smartSpeed:700,
		dots:false,
		nav:true,
		navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsiveClass:true,
		responsive: { 
			0: {
				items:1
			},
			768: {
				items:2
			},
			992: {
				items:3
			},
			1200: {
				items:4
			}
		}

	

	});

	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

	//onResize Window
	function onResize() {
		$('.carousel-services-content').equalHeights();
	}onResize();
	window.onresize = function() {onResize()};
	


});