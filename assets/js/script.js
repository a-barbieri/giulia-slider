/*global window: false */
/*jshint devel: true */
/*jshint jquery: true */
  
$(function () {
  
  "use strict";

  
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // SLIDESHOW
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // Initiate the slideshow
  
  imagesLoaded( '.slideshow', function()
    {
      $('.slideshow').slideshow();
    }
  );

  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // MASONRY
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  $('.masonry-container').masonry(
    {
      gutter:           '.gutter-sizer',
      itemSelector:     '.masonry-item'
    });
    
});