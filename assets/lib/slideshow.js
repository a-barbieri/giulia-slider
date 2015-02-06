/*global window: false */
/*jshint devel: true */
/*jshint jquery: true */

// / / / / / / / / / / / / / / / / / / / / / / / / / //
//                                                   //
//                SLIDESHOW PLUGIN                   //
//                                                   //
// / / / / / / / / / / / / / / / / / / / / / / / / / //
//
// Author: info@alessandrobarbieri.net
// Version: 0.0.1
// - - - - - - - - - - - - - - - - - - - - - - - - -
// For a better result use it with imagesLoaded plugin 
// http://imagesloaded.desandro.com/
// - - - - - - - - - - - - - - - - - - - - - - - - -

(function ( $ ) {
 
  "use strict";



  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // SLIDESHOW CONSTRUCTOR
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // Refer to http://acuriousanimal.com/blog/2013/01/15/things-i-learned-creating-a-jquery-plugin-part-i/

  $.fn.slideshow = function( settings ) 
  {
      var args = arguments;
      
      if (settings === undefined || typeof settings === 'object') 
      {
        // Creates a new plugin instance, for each selected element, and
        // stores a reference withint the element's data
        return this.each(function() 
        {
          if (!$.data(this, 'slideshow_settings')) 
          {
            $.data(this, 'slideshow_settings', new Slideshow(this, settings));
          }
        });
      } 
      else if (typeof settings === 'string' && settings[0] !== '_' && settings !== 'init') 
      {
        // Call a public pluguin method (not starting with an underscore) for each
        // selected element.
        if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(settings, $.fn.slideshow.getters) != -1) {
            // If the user does not pass any arguments and the method allows to
            // work as a getter then break the chainability so we can return a value
            // instead the element reference.
            var instance = $.data(this[0], 'slideshow_settings');
            return instance[settings].apply(instance, Array.prototype.slice.call(args, 1));
        } 
        else 
        {
          // Invoke the speficied method on each selected element
          return this.each(function() 
          {
            var instance = $.data(this, 'slideshow_settings');
            if (instance instanceof Plugin && typeof instance[settings] === 'function') 
            {
                instance[settings].apply(instance, Array.prototype.slice.call(args, 1));
            }
          });
        }
      }
  }; 


  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // SLIDESHOW DEFAULT settings
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  $.fn.slideshow.defaults = {
      // each slide width
      'slideWidth':   new Array(),
      // the left offset to position each slide
      'leftOffset':   new Array(),
      // the width of the slideshow with every slide one next to the other
      'totalWidth':   0,
      // value to host current slide number
      'activeSlide':  '',
      // value to host prev/next slide number
      'targetSlide':  ''
  };


  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // SLIDESHOW GETTERS settings
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // Use this to link getter methods
  $.fn.slideshow.getters = {
  };
  

  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // SLIDESHOW OBJECT
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  
  function Slideshow( element, settings) 
  {
      // Store references to the selected element
      this.el           = element;
      this.$el          = $(element);
      this.slide       = new Array();
      this.slide.list  = this.$el.children();
   
      // Merge passes settings with defaults
      $.extend( this.slide, $.fn.slideshow.defaults );
     
      // Initialize the plugin instance
      this.init();
  }
  

  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // SLIDESHOW METHODS
  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // Here are placed all methods of the Slideshow object
  // REMEMBER THAT THIS IS AN OBJECT: USE 'KEY: VALUE' PAIRS!
  Slideshow.prototype = {
    

    // init()
    // ------
    // Initialize slideshow properties
    init: function()
    {
        // Initialize slideshow
        this.$el.addClass('slideshow-ready');
        
        // Declare the first active slide which will be numeber '2' 
        // because it's the third in the actual slide list
        this.slide.activeSlide = 2;

        this.setup();
        this.setPrevNext();
        
        // on resize event
        var that = this;
        $( window ).resize( function()
        {
          console.log('resize');
          that.update();
        });
    },
    

    // getTotalWidth()
    // ---------------
    getTotalWidth: function()
    {
        // Create alias for 'this' to be used inside functions 
        var that = this;

        // get total width of the slideshow when all slides are aligned one next to the other one
        $.each( this.slide.list, function( id, slide )
        {
          that.slide.totalWidth += $( slide ).outerWidth();
        });
    },
    

    // getLeftOffset()
    // ---------------
    getLeftOffset: function()
    {
        // Create alias for 'this' to be used inside functions 
        var that = this;
        
        // Reset previous stored settings
        // using this method http://stackoverflow.com/questions/1232040/empty-an-array-in-javascript
        while( this.slide.leftOffset.length > 0 ) this.slide.leftOffset.pop();
        
        // Calculate how the slideshow container should be offset
        // in order to center the slide on viewport
        // NOTE: you need to repeat the each in order to have the width for each element       
        $.each( this.slide.list, function( id, slide )
        {
          // get the elements that will be before the prev/next slide
          var prevSlides = new Array();
          prevSlides.push( id - 1 );
          prevSlides.push( id - 2 );
          $.each( prevSlides, function( key, value )
          {
            if ( value < 0 ) prevSlides[key] = that.slide.list.length + value; // value is supposed to be a negative number
          });

          that.slide.leftOffset.push(
            
              $( that.slide.list[ prevSlides[0] ] ).width()
              +
              $( that.slide.list[ prevSlides[1] ] ).width()
              +
              ( $( that.slide.list[ id ] ).width() / 2 )
              -
              ( $( window ).width() / 2 )
          );
        });
        console.log(this.slide.leftOffset[ this.slide.activeSlide ]);
    },
    

    // setup()
    // -----------------
    // Set up the environment
    setup: function()
    {
        // get some settings                
        this.getTotalWidth();
        this.getLeftOffset();

        // Move last elements to the beginning of the slideshow
        $(this.slide.list[ this.slide.list.length - 1 ]).detach().prependTo(this.$el);
        $(this.slide.list[ this.slide.list.length - 2 ]).detach().prependTo(this.$el);

        // Set the width needed to place all slides on the same line without returns
        this.$el
          .width( this.slide.totalWidth )
          .offset({ left: - this.slide.leftOffset[ 0 ] });
    },
    

    // update()
    // -----------------
    // Set up the environment
    update: function()
    {
        // get some settings                
        this.getLeftOffset();

        console.log(this.slide.leftOffset[ this.slide.activeSlide ]);
        // Set the width needed to place all slides on the same line without returns
        this.$el.offset({ left: - this.slide.leftOffset[ this.slide.activeSlide ] });
    },


    // setPrevNext()
    // ------
    setPrevNext: function()
    {
        // Create alias for 'this' to be used inside functions 
        var that = this;
                
        // Setup click behaviour
        this.$el.click( function( el ) 
        {
          // check where the user clicked
          var clickPositionX = el.pageX;
          // if the point where the user clicked is on the left half of the screen
          if ( clickPositionX < $(window).width() / 2 ) var direction = 'prev';
          // ... otherwise the user if the user clicked on the right half
          else var direction = 'next';
                    
          // Prev
          // ----
          // if the user click 'prev' get the total width 
          // of the slides that come before the active one 
          // +
          // the last of the array
          if ( direction === 'prev' )
          {
            // check if you are at the last slide of the list and consequenlty set target slide number 
            if ( that.slide.activeSlide === 0 ) that.slide.targetSlide = that.slide.list.length - 1 ;
            else that.slide.targetSlide = that.slide.activeSlide - 1;

            // Move the slideshow
            that.$el.animate(
              { 
                // Move the slideshow to center the targetted slide
                marginLeft: $( that.slide.list[ that.slide.activeSlide ] ).width() / 2 
                            + $( that.slide.list[ that.slide.targetSlide ] ).width() / 2,
              }, 
              function()
              {
                // Once the slideshow is in the new position
                // move element from end to beginning of the list
                $( that.$el[0]['children'][that.slide.list.length - 1] )
                  .detach()
                  .prependTo( $( that.$el ) );
                $( that.$el )
                  .css({
                    left       : - that.slide.leftOffset[ that.slide.activeSlide ],
                    marginLeft : 0
                  });
              }
            );
          }
          
          // Next
          // ----
          // if the user click 'next'
          else if ( direction === 'next' )
          {
            // check if you are at the last slide of the list and consequenlty set target slide number 
            if ( that.slide.activeSlide === that.slide.list.length - 1 ) that.slide.targetSlide = 0;
            else that.slide.targetSlide = that.slide.activeSlide + 1;
            
            // Move the slideshow
            that.$el.animate(
              { 
                // Move the slideshow to center the targetted slide
                marginLeft: - $( that.slide.list[ that.slide.activeSlide ] ).width() / 2 
                            - $( that.slide.list[ that.slide.targetSlide ] ).width() / 2,
              }, 
              function() 
              {
                // Once the slideshow is in the new position
                // move element from end to beginning of the list
                $( that.$el[0]['children'][0] )
                  .detach()
                  .appendTo( $( that.$el ) );
                $( that.$el )
                  .css({
                    left       : - that.slide.leftOffset[ that.slide.activeSlide ],
                    marginLeft : 0
                  });
              }
            );
          }
          
          // update 'activeSlide'
          that.slide.activeSlide = that.slide.targetSlide;
        });
    }
  }

}( jQuery ));
