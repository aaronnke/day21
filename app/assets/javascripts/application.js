// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function AnimateIt() {
    var theContainer = $(".tank"),
      maxLeft = theContainer.width() - 100,
      maxTop = theContainer.height() - 100

    $.each($(".the-div"), function(index, value){
      var theDiv = $(value),
        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = Math.floor(Math.random() * maxTop);
      
      if (theDiv.position().left < leftPos) {
          theDiv.removeClass("left").addClass("right");
      } else {
          theDiv.removeClass("right").addClass("left");
      }
          
      theDiv.animate({
          "left": leftPos,
          "top": topPos
      }, 5000);
    });

    setTimeout(AnimateIt, 5000)
}


$(document).ready(function(){
    AnimateIt();
});

