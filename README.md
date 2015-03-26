# giulia-slider
Horizontal infinite slider

Preview @ http://alessandrobarbieri.net/giulia-slider/
Maybe too gay friendly images... but hey, I got bored by furry cats and funky dogs.

## Usage
Download the `slideshow.js` file and add the following line at the bottom of your HTML.
```
<script src="assets/lib/slideshow.js"></script>
```
To be able to use it you need at least 5 images on a list (this will be fixed later).
See the following code
```
<ul class="slideshow">
  <li>
    <img src="your-image.jpg">
  </li>
  <li>
    <img src="your-image.jpg">
  </li>
  <li>
    <img src="your-image.jpg">
  </li>
  <li>
    <img src="your-image.jpg">
  </li>
  <li>
    <img src="your-image.jpg">
  </li>
</ul>
```
To initiate it add this script
````
$('.slideshow').slideshow();
````
To better control images use imagesLoaded by DeSandro https://github.com/desandro/imagesloaded
````
  imagesLoaded( '.slideshow', function()
    {
      $('.slideshow').slideshow();
    }
  );
````
And this is the minimum css (probably it can be less than that)
```
.showcase {
  width: 100%;
  height: 600px;
  margin-top: 48px;
  overflow: hidden;
}
.slideshow {
  width: 100%;
  position: relative;
}
  .slideshow > li {
    margin: 0 auto;
    .columnWidth(10);
    margin-left: 0; // you can change this if you want to create a gutter
  }
    .slideshow > li > img {
      width: 100%;
      height: auto;
    }

// the following class is applaied when the plugin is initiated
.slideshow-ready {
}
  .slideshow-ready > li {
    float: left;
  }
  .slideshow-ready .prev,
  .slideshow-ready .next {
    cursor: pointer;
  }

```  
