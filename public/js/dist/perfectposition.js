function moveToNew(e){
  //get y position of element to move to using getBoundingClientRect().y
  var target = document.getElementById(e);
  var currentPosition = offset(target).top;
  var screenHeight = window.innerHeight;
  var moveAmount = screenHeight / 5;
  var newPosition = currentPosition - moveAmount;

  window.scrollTo(0, newPosition)
}

function test2(e) {
  var dataName = e.getAttribute('data-name');
  moveToNew(dataName);
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop}
}

// function moveToNew(e){
//   //get y position of element to move to using getBoundingClientRect().y
//   var currentPosition = document.getElementById(e).getBoundingClientRect().y;
//   var screenHeight = window.innerHeight;
//   var moveAmount = screenHeight / 5;
//   var newPosition = currentPosition - moveAmount;
//
//   window.scrollTo(0, newPosition)
// }
