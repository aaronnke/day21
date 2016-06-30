var Puffer = function(){
  this.positionTop = 0
  this.positionLeft = 0
  this.htmlElement = $("<div class='puffer'></div>")
  var ownSelf = this
  $( ".tank" ).append( this.htmlElement );

  function animateMovement(){
    var theContainer = $(".tank"),
      maxLeft = theContainer.width() - ownSelf.htmlElement.width(),
      maxTop = theContainer.height() - ownSelf.htmlElement.height(),
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
          }, Math.random()*3000+3000,
          ownSelf.animateMovement
        );
      }
  }

  this.animateMovement = animateMovement
}

// $(document).ready(function(){
//   $( ".cup" ).click(function() {
//     var puffer = new Puffer();
//     puffer.animateMovement();
//   });
// });

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
    $.each($('.puffer'), function(index2, fish){
      if (doTheyOverlap($(value),$(fish))){   
        $(value).remove();
        var newWidth = $(fish).width() + 5 + 'px'
        var newHeight = $(fish).height() + 5 + 'px'
        $(fish).css({width: newWidth, height: newHeight});
      }
    })
  })  
}, 1);
