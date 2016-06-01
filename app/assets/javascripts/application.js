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
//= require jquery.overlaps
//= require turbolinks
//= require_tree .

var audio = new Audio('/assets/munch.mp3');

var Fish = function(){
  this.positionTop = 0
  this.positionLeft = 0
  this.htmlElement = $("<div class='the-div'></div>")
  var ownSelf = this
  $( ".tank2" ).append( this.htmlElement );

  function animateMovement(){
    var theContainer = $(".tank"),
      maxLeft = theContainer.width() - 100,
      maxTop = theContainer.height() - 100,
      leftPos = Math.floor(Math.random() * maxLeft),
      topPos = Math.floor(Math.random() * maxTop);
      
      if (ownSelf.htmlElement.position().left < leftPos) {
          ownSelf.htmlElement.removeClass("left").addClass("right");
      } else {
          ownSelf.htmlElement.removeClass("right").addClass("left");
      }

      if ($('.food').length){
        var foodLength = $('.food').length,
         foodObject = $('.food').eq(Math.floor(Math.random() * foodLength))
         ownSelf.htmlElement.animate({
          "left": foodObject.offset().left - $(window).width()*0.15,
          "top": foodObject.offset().top - $(window).height()*0.15,
          }, 500, 
          ownSelf.animateMovement
        );
      } 
      else{
        ownSelf.htmlElement.animate({
          "left": leftPos,
          "top": topPos
          }, Math.random()*1000+3500,
          ownSelf.animateMovement
        );
      }
  }

  this.animateMovement = animateMovement
}

$(document).ready(function(){
  $( ".add" ).click(function() {
    var fish1 = new Fish();
    fish1.animateMovement();
  });
});

$(function(){
    $(document).click(function(e){
        var xc = e.pageX ;
        var yc = e.pageY ;
        var x = e.pageX + 'px';
        var y = e.pageY + 'px';
        var food = $("<div class='food'><div/>");
        var div = $('<div>').css({
            "position": "absolute",                    
            "left": x,
            "top": y
        });
        if (yc < 155 && xc < $(window).width()*0.85 && xc > $(window).width()*0.15){
          div.append(food);
          $(document.body).append(div);
          div.animate({
            top: '155px'
          }).animate({
            top: '900px'
          }, 6000).delay(100).fadeOut(500, function() { $(this).remove(); });          
        }   
    });
});


window.setInterval(function(){
  $.each($('.food'), function(index, value){
    $.each($('.the-div'), function(index2, fish){
      if (doTheyOverlap($(value),$(fish))){   
        audio.play();
        $(value).remove();
        var newWidth = $(fish).width() + 20 + 'px'
        var newHeight = $(fish).height() + 20 + 'px'
        $(fish).css({width: newWidth, height: newHeight});
      }
    })
  })  
}, 1);


  // $.each($('.food'), function(index, value){
  //   if (doTheyOverlap($(value),$('.the-div'))){   
  //     $(value).remove();
  //   }
  // })  