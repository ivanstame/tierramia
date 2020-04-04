(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(value, mode) {
        if (1 & mode) value = __webpack_require__(value);
        if (8 & mode) return value;
        if (4 & mode && "object" === typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./assets/js/main.js");
})({
    "./assets/js/main.js": function(module, exports) {
        eval("const track = document.querySelector('.slider-track');\nconst slides = Array.from(track.children);\nconst nextButton = document.querySelector('.slider_btn--right');\nconst prevButton = document.querySelector('.slider_btn--left');\nvar targetIndex = 0;\nprevButton.style.visibility = 'hidden';\nconst slideWidth = slides[0].getBoundingClientRect().width; // apparently you can set the parameters and anonymous function contents to an operation as a variable\n\nconst setSlidePosition = (slide, index) => {\n  slide.style.position = 'absolute';\n  slide.style.left = slideWidth * index + 'px';\n};\n\nconst moveToSlide = (track, currentSlide, targetSlide) => {\n  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';\n  currentSlide.classList.remove('current_slide');\n  targetSlide.classList.add('current_slide');\n};\n\nconst addSwipeToSlides = (slide, index) => {\n  slide.addEventListener('swiped-left', e => {\n    // alert('swiped-left!');\n    const currentSlide = track.querySelector('.current_slide');\n    const nextSlide = currentSlide.nextElementSibling;\n    moveToSlide(track, currentSlide, nextSlide);\n    targetIndex++;\n    prevButton.style.visibility = 'visible';\n\n    if (targetIndex == slides.length - 1) {\n      nextButton.style.visibility = 'hidden';\n    } else {\n      nextButton.style.visibility = 'visible';\n    }\n  });\n  slide.addEventListener('swiped-right', e => {\n    // alert('swiped-right!');\n    const currentSlide = track.querySelector('.current_slide');\n    const previousSlide = currentSlide.previousElementSibling;\n    moveToSlide(track, currentSlide, previousSlide);\n    targetIndex--;\n    nextButton.style.visibility = 'visible';\n\n    if (targetIndex == 0) {\n      prevButton.style.visibility = 'hidden';\n    } else {\n      prevButton.style.visibility = 'visible';\n    }\n  });\n}; // then simply plug that shit in\n\n\nslides.forEach(setSlidePosition);\nslides.forEach(addSwipeToSlides); // create a function that moves the slides to where they need to go\n// when this functions parameters are created you have to ask yourself \"what is\n// needing to be affected by this function in order for it to do its job\"\n// when i click left, move slides to the left\n\nprevButton.addEventListener('click', e => {\n  const currentSlide = track.querySelector('.current_slide');\n  const previousSlide = currentSlide.previousElementSibling;\n  moveToSlide(track, currentSlide, previousSlide);\n  targetIndex--;\n  nextButton.style.visibility = 'visible';\n\n  if (targetIndex == 0) {\n    prevButton.style.visibility = 'hidden';\n  } else {\n    prevButton.style.visibility = 'visible';\n  }\n});\nnextButton.addEventListener('click', e => {\n  const currentSlide = track.querySelector('.current_slide');\n  const nextSlide = currentSlide.nextElementSibling;\n  moveToSlide(track, currentSlide, nextSlide);\n  targetIndex++;\n  prevButton.style.visibility = 'visible';\n\n  if (targetIndex == slides.length - 1) {\n    nextButton.style.visibility = 'hidden';\n  } else {\n    nextButton.style.visibility = 'visible';\n  }\n}); //windowPane stuff\n\nconst windowPane = document.querySelector('#path-window');\nwindowPane.addEventListener('swiped-right', e => {\n  windowPane.style.transform = 'translateX(25%)';\n});\nwindowPane.addEventListener('swiped-left', e => {\n  windowPane.style.transform = 'translateX(0)';\n}); //image slideshow\n\nlet t = 0;\nsetInterval(function () {\n  t = t + 1;\n\n  if (t >= 16) {\n    t = 0;\n    $('#img1').show();\n    $('#img2').show();\n    $('#img3').show();\n  }\n\n  switch (t) {\n    case 5:\n      $('#img3').fadeOut('slow');\n      break;\n\n    case 10:\n      $('#img2').fadeOut('slow');\n      break;\n\n    case 15:\n      $('#img1').fadeOut('slow');\n      $('#img3').fadeIn('slow');\n      break;\n  }\n}, 1000);\n$(window).on('resize', function () {\n  var win = $(this); //this = window\n\n  if (win.height() >= 820) {\n    /* ... */\n  }\n\n  if (win.width() >= 1024) {}\n}); //when the window resizes we have to have the slides reposition themselves\n\n//# sourceURL=webpack:///./assets/js/main.js?");
    }
});