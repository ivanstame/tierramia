document.body.style.transition = "1s all";
var citiesList = document.getElementsByClassName('cities-list');
var laCountyOGHeight = citiesList[0].getBoundingClientRect().height;
var orangeCountyOGHeight = citiesList[1].getBoundingClientRect().height;
var bayAreaOGHeight = citiesList[2].getBoundingClientRect().height;
var laCountyCities = citiesList[0]; // the LA County City List <ul>
var orangeCountyCities = citiesList[1]; // the Orange County City List <ul>
var bayAreaCities = citiesList[2]; // the Orange County City List <ul>
var laCounty = document.getElementsByClassName('county-item')[1];
var orangeCounty = document.getElementsByClassName('county-item')[0];
var bayArea = document.getElementsByClassName('county-item')[2];
var i = 0;
while (i < citiesList.length){
  citiesList[i].style.height = "0px";
  i++;
  console.log('heights reduced to 0');
}
var z = 0;
while (z < citiesList.length){
  citiesList[z].classList.add('out-of-the-way');
  z++;
  console.log('scales reduced to 0');
}

laCounty.addEventListener('click', function(){
  citiesList[0].classList.remove('out-of-the-way');
  orangeCountyCities.style.height = "0px";
  bayAreaCities.style.height = "0px";
  if(laCountyCities.style.height == "0px")
  {
    laCountyCities.style.height = laCountyOGHeight + "px";
  }
  else
  {
    laCountyCities.style.height = "0px";
  }

  laCounty.classList.toggle('county-active');
  orangeCounty.classList.remove('county-active');
  bayArea.classList.remove('county-active');
  for(j=0; j < citiesList.length; j++)
  {
    if(j == 0){
      console.log('it was zero at least once')
    }
    else {
      citiesList[j].classList.add('out-of-the-way');
      console.log('it is now ' + j);
    }
  }
});

orangeCounty.addEventListener('click', function(){
  citiesList[1].classList.remove('out-of-the-way');
  laCountyCities.style.height = "0px";
  bayAreaCities.style.height = "0px";
  if(orangeCountyCities.style.height == "0px")
  {
    orangeCountyCities.style.height = orangeCountyOGHeight + "px";
  }
  else
  {
    orangeCountyCities.style.height = "0px";
  }
  orangeCounty.classList.toggle('county-active');
  laCounty.classList.remove('county-active');
  bayArea.classList.remove('county-active');
  for(j=0; j < citiesList.length; j++)
  {
    if(j == 1){
      console.log('it was zero at least once')
    }
    else {
      citiesList[j].classList.add('out-of-the-way');
      console.log('it is now ' + j);
    }
  }
});

bayArea.addEventListener('click', function(){
  citiesList[2].classList.remove('out-of-the-way');
  laCountyCities.style.height = "0px";
  orangeCountyCities.style.height = "0px";
  if(bayAreaCities.style.height == "0px")
  {
    bayAreaCities.style.height = bayAreaOGHeight + "px";
  }
  else
  {
    bayAreaCities.style.height = "0px";
  }
  bayArea.classList.toggle('county-active');
  laCounty.classList.remove('county-active');
  orangeCounty.classList.remove('county-active');
  for(j=0; j < citiesList.length; j++)
  {
    if(j == 2){
      console.log('it was zero at least once')
    }
    else {
      citiesList[j].classList.add('out-of-the-way');
      console.log('it is now ' + j);
    }
  }
});

function initialSetup(){
  citiesList[0].classList.remove('out-of-the-way');
  orangeCountyCities.style.height = "0px";
  bayAreaCities.style.height = "0px";
  if(laCountyCities.style.height == "0px")
  {
    laCountyCities.style.height = laCountyOGHeight + "px";
  }
  else
  {
    laCountyCities.style.height = "0px";
  }

  laCounty.classList.toggle('county-active');
  orangeCounty.classList.remove('county-active');
  bayArea.classList.remove('county-active');
  for(j=0; j < citiesList.length; j++)
  {
    if(j == 0){
      console.log('it was zero at least once')
    }
    else {
      citiesList[j].classList.add('out-of-the-way');
      console.log('it is now ' + j);
    }
  }
}

initialSetup();

//Get the button:
topBtn = document.getElementById("top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

topBtn.addEventListener('click', function(){
  scrollToY(0, 1500, 'easeInOutQuint');
});

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// main function
function scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}

// $(".sliding-link").click(function(e) {
//     e.preventDefault();
//     var aid = $(this).attr("href");
//     $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
// });
// scroll it!
