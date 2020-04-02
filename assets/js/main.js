const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.slider_btn--right');
const prevButton = document.querySelector('.slider_btn--left');
var targetIndex = 0;
prevButton.style.visibility = 'hidden';

const slideWidth = slides[0].getBoundingClientRect().width;

// apparently you can set the parameters and anonymous function contents to an operation as a variable
const setSlidePosition = (slide, index) => {
	slide.style.position = 'absolute';
	slide.style.left = slideWidth * index + 'px';
};
const resetSlidePosition = (slide, index) => {
	slide.style.position = 'unset';
	slide.style.width = '33%';
};

const addSwipeToSlides = (slide, index) => {
	slide.addEventListener('swiped-left', e => {
		// alert('swiped-left!');
		const currentSlide = track.querySelector('.current_slide');
		const nextSlide = currentSlide.nextElementSibling;

		moveToSlide(track, currentSlide, nextSlide);
		targetIndex++;
		prevButton.style.visibility = 'visible';

		if (targetIndex == slides.length - 1) {
			nextButton.style.visibility = 'hidden';
		} else {
			nextButton.style.visibility = 'visible';
		}
	});
	slide.addEventListener('swiped-right', e => {
		// alert('swiped-right!');
		const currentSlide = track.querySelector('.current_slide');
		const previousSlide = currentSlide.previousElementSibling;

		moveToSlide(track, currentSlide, previousSlide);

		targetIndex--;
		nextButton.style.visibility = 'visible';
		if (targetIndex == 0) {
			prevButton.style.visibility = 'hidden';
		} else {
			prevButton.style.visibility = 'visible';
		}
	});
};

// then simply plug that shit in
slides.forEach(setSlidePosition);
slides.forEach(addSwipeToSlides);
// create a function that moves the slides to where they need to go
// when this functions parameters are created you have to ask yourself "what is
// needing to be affected by this function in order for it to do its job"

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove('current_slide');
	targetSlide.classList.add('current_slide');
};

// when i click left, move slides to the left

prevButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current_slide');
	const previousSlide = currentSlide.previousElementSibling;

	moveToSlide(track, currentSlide, previousSlide);

	targetIndex--;
	nextButton.style.visibility = 'visible';
	if (targetIndex == 0) {
		prevButton.style.visibility = 'hidden';
	} else {
		prevButton.style.visibility = 'visible';
	}
});

nextButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current_slide');
	const nextSlide = currentSlide.nextElementSibling;

	moveToSlide(track, currentSlide, nextSlide);
	targetIndex++;
	prevButton.style.visibility = 'visible';

	if (targetIndex == slides.length - 1) {
		nextButton.style.visibility = 'hidden';
	} else {
		nextButton.style.visibility = 'visible';
	}
});

//windowPane stuff

const windowPane = document.querySelector('#path-window');

windowPane.addEventListener('swiped-right', e => {
	windowPane.style.transform = 'translateX(25%)';
});

windowPane.addEventListener('swiped-left', e => {
	windowPane.style.transform = 'translateX(0)';
});

//image slideshow
let t = 0;

setInterval(function() {
	t = t + 1;

	if (t >= 16) {
		t = 0;
		$('#img1').show();
		$('#img2').show();
		$('#img3').show();
	}

	switch (t) {
		case 5:
			$('#img3').fadeOut('slow');
			break;
		case 10:
			$('#img2').fadeOut('slow');
			break;
		case 15:
			$('#img1').fadeOut('slow');
			$('#img3').fadeIn('slow');
			break;
	}
}, 1000);

//when the window resizes we have to have the slides reposition themselves
$(window).on('resize', function() {
	if ($(window).width() < 1024) {
		slides.forEach(setSlidePosition);
		slides.forEach(addSwipeToSlides);
		console.log('resized');
	} else {
		console.log('no-need');
	}
});
