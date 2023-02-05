function bodyFixPosition() {
	setTimeout( function() {
		if ( !document.body.hasAttribute('data-body-scroll-fix') ) {
			var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
			document.body.setAttribute('data-body-scroll-fix', scrollPosition);
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.top = '-' + scrollPosition + 'px';
			document.body.style.left = '0';
			document.body.style.width = '100%';
		}
	}, 15 ); 
}

function bodyUnfixPosition() {
	if ( document.body.hasAttribute('data-body-scroll-fix') ) {
		var scrollPosition = document.body.getAttribute('data-body-scroll-fix');
		document.body.removeAttribute('data-body-scroll-fix');
		document.body.style.overflow = '';
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.width = '';
		window.scroll(0, scrollPosition);
	}
}

$(function() {

	//Vars
	var $body = $('body');
	var $doc = $(document);
	var $window = $(window);

	//Fixed header
	$('.js-header-fixed').sticky({
		topSpacing: 0
	});

	//Open mobile menu
	$('.js-toggle-mobile-menu').on('click', function() {
		$body.toggleClass('mobile-menu-is-open');
	});

	//Animations
	$('.js-fade-in-up').animated('fadeInUp');
	$('.js-fade-in-left').animated('fadeInLeft');
	$('.js-fade-in-right').animated('fadeInRight');
	$('.js-fade-in-down').animated('fadeInDown');
	$('.js-fade-in').animated('fadeIn');

	//Popups
	$('.js-popup-btn').magnificPopup({
		showCloseBtn: false,
		callbacks: {
			beforeOpen: function() {
				bodyFixPosition();
			},
			beforeClose: function() {
				bodyUnfixPosition();
			}
		}
	});
	$('.js-popup-btn-iframe').magnificPopup({
		type: 'iframe'
	});
	$doc.on('click', '.js-popup-close', function() {
		$.magnificPopup.close();
	});

	//Lists
	var $listItem = $('.js-list-item');
	$('.js-list-item-top').on('click', function() {
		var $th = $(this);
		var $mainParent = $th.closest('.js-list-item');
		$listItem.not($mainParent).removeClass('is-open');
		$mainParent.toggleClass('is-open');
		$th.next().slideToggle('fast');
		$listItem.not('.is-open').find('.js-list-item-content').slideUp('fast');
	});

	$doc.click(function(e){
		if ($(e.target).closest('.js-list-item-top').length) return;
		$listItem.removeClass('is-open');
		$('.js-list-item-content').slideUp('fast');
		e.stopPropagation();
	});

	//Tabs
	var $tabsItem = $('.js-tabs-control');
	$tabsItem.each(function() {
		var $th = $(this);
		var $parent = $th.parents('.js-tabs');
		var $tabsBlock = $parent.find('.js-tabs-block');
		if ($th.hasClass('active')) {
			$tabsBlock.hide().eq($th.index()).fadeIn();
		}
	});
	$tabsItem.click(function(e) {
		var $th = $(this);
		var $parent = $th.parents('.js-tabs');
		var $tab = $parent.find('.js-tabs-control');
		var $tabsBlock = $parent.find('.js-tabs-block');
		$tab.removeClass('active');
		$th.addClass('active');
		// e.target.scrollIntoView({block: 'nearest', inline: 'center', behavior: 'smooth'});
		$tabsBlock.hide().eq($th.index()).fadeIn();
	});

	//Benefits slider
	var benefitsSlider = '.js-benefits-slider';
	if ($(benefitsSlider).length > 0) {
		var $benefitsSlider = new Swiper('.js-benefits-slider', {
			speed: 700,
			slidesPerView: 3,
			slidesPerGroup: 3,
			autoplay: false,
			spaceBetween: 24,
			pagination: {
				el: '.js-benefits-slider-dots',
				clickable: true
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				996: {
					slidesPerView: 3,
					slidesPerGroup: 3,
				}
			}
		});
	}

	//Output
	$doc.on('click', '.js-output-item', function() {
		var $th = $(this);
		var $parent = $th.closest('.js-output');
		var icon = $th.find('.input-system-item__icon').attr('src');
		var title = $th.find('.input-system-item__title').text();
		var currency = $th.attr('data-currency');
		$parent.find('.js-output-icon').attr('src', icon);
		$parent.find('.js-output-name').text(title);
		$parent.find('.js-output-title').text(currency);
		$parent.find('.js-output-item').removeClass('active');
		$th.addClass('active');
	});

	//Add file
	$doc.on('click', '.js-file-control', function() {
		var $th = $(this);
		var $parent = $th.closest('.js-file');
		var $element = $parent.clone();
		$parent.after($element);
		$th.remove();
		checkFields();
	});
	function checkFields() {
		var filesCount = $('.js-file').length;
		if (filesCount == 3) {
			$('.js-file-control').remove();
		}
	}
	/*$doc.on('change', '.js-file-field', function(e) {
		var fileName = e.target.files[0].name;
		$(this).closest('.js-file').find('.js-file-name').text(fileName);
	})

 	$('.js-reviews-form').on('submit', function(e) {
		e.preventDefault();
		var $form = $(this);
		$.post('путь_до_обработчика', $form.find(':input'), function (response) {
			if (response.result) {
				//Что-то делаем, если есть ответ
			}
		}, 'json');
	}) */

	//Copy link
	$('.js-refs-btn').on('click', function() {
		var link = document.getElementById('js-refs-link');
		link.select();
		link.setSelectionRange(0, 99999)
		document.execCommand("copy");
	});

	//Deposit
	var $depositBtn = $('.js-deposit-btn');
	var $depositItem = $('.js-deposit-item');
	var $depositForm = $('.js-deposit-form');
	$depositBtn.on('click', function() {
		var $th = $(this);
		var $parent = $th.closest('.js-deposit-item');
		var $btnTitle = $th.find('.btn__title');
		var title = $btnTitle.text();
		var titleOld = $th.data('title-old');
		var titleNew = $th.data('title-new');
		$depositItem.not($parent).removeClass('is-selected');
		$depositBtn.not($th).removeClass('active');
		$parent.toggleClass('is-selected');
		$th.toggleClass('active');
		$depositBtn.not($th).find('.btn__title').text(titleOld);
		if (title === titleNew) {
			$btnTitle.text(titleOld);
		} else {
			$btnTitle.text(titleNew);
		}
		if ($('.js-deposit-item.is-selected').length > 0) {
			$depositForm.removeClass('is-disabled');
		} else {
			$depositForm.addClass('is-disabled');
		}
	});

});
