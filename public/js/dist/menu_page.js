var hotBtn;
var coldBtn;
var pastriesBtn;
var coldPane;
var hotPane;
var pastryPane;

var anchorBtns = document.getElementsByClassName('int-anchor-container')[0].children;
var menuList = document.getElementsByClassName('menu-list');

function removeVisible(target){
    target.classList.add('visuallyhidden');
    setTimeout(function(){
      target.classList.add('hidden');
    }, 20);
}

function grabElements() {
  var i = 0;
  while(i < anchorBtns.length){
    switch(i) {
    case 0:
      hotBtn = anchorBtns[i];
      break;
    case 1:
      coldBtn = anchorBtns[i];
      break;
    case 2:
      pastriesBtn = anchorBtns[i];
      break;

    }
    i++;
  }

  var j = 0;
  while(j < menuList.length){
    switch(j) {
    case 0:
      coldPane = menuList[j];
      break;
    case 1:
      hotPane = menuList[j];
      break;
    case 2:
      pastryPane = menuList[j];
      break;

    }
    j++;
  }
}

grabElements();

hotBtn.addEventListener('click', function () {
  $(anchorBtns).not($(anchorBtns[0])).each(function(index, element){
    element.classList.remove('active');
  });
  this.classList.add('active');
  $('.menu-list').not($('.menu-list')[1]).each(function(index, element){
    removeVisible(element);
  });
    hotPane.classList.remove('hidden');
    setTimeout(function () {
      hotPane.classList.remove('visuallyhidden');
    }, 20);
});

coldBtn.addEventListener('click', function () {
  $(anchorBtns).not($(anchorBtns[1])).each(function(index, element){
    element.classList.remove('active');
  });
  this.classList.add('active');
  $('.menu-list').not($('.menu-list')[0]).each(function(index, element){
    removeVisible(element);
  });
    coldPane.classList.remove('hidden');
    setTimeout(function () {
      coldPane.classList.remove('visuallyhidden');
    }, 20);
});

pastriesBtn.addEventListener('click', function () {
  $(anchorBtns).not($(anchorBtns[2])).each(function(index, element){
    element.classList.remove('active');
  });
  this.classList.add('active');
  $('.menu-list').not($('.menu-list')[2]).each(function(index, element){
    removeVisible(element);
  });
    pastryPane.classList.remove('hidden');
    setTimeout(function () {
      pastryPane.classList.remove('visuallyhidden');
    }, 20);
});
