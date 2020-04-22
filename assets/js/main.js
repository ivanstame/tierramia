$(document).ready(function() {
	let vh = window.innerHeight * 0.01;
	let vw = window.innerWidth * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	document.documentElement.style.setProperty('--vw', `${vw}px`);

	const track = document.querySelector('.slider-track');
	const slides = Array.from(track.children);
	const nextButton = document.querySelector('.slider_btn--right');
	const prevButton = document.querySelector('.slider_btn--left');
	var targetIndex = 0;
	prevButton.style.visibility = 'hidden';

	let slideWidth = slides[0].getBoundingClientRect().width;

	// apparently you can set the parameters and anonymous function contents to an operation as a variable
	const setSlidePosition = (slide, index) => {
		slide.style.position = 'absolute';
		slide.style.left = slideWidth * index + 'px';
	};

	const moveToSlide = (track, currentSlide, targetSlide) => {
		track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
		currentSlide.classList.remove('current_slide');
		targetSlide.classList.add('current_slide');
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

	slides.forEach(setSlidePosition);
	slides.forEach(addSwipeToSlides);

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

	//image slideshow

	$(window).on('resize', function() {
		slideWidth = slides[0].getBoundingClientRect().width;
		slides.forEach(setSlidePosition);
		console.log('size changed');
		setSlideHeight();
		console.log('it worked');
	});
});

//when the window resizes we have to have the slides reposition themselves
