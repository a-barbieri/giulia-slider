# giulia-slider
Horizontal infinite slider

Preview @ http://alessandrobarbieri.net/giulia-slider/
Maybe too gay friendly images... but hey, I got annoyed by furry cats and funky dogs.

## Usage
Simply download the `slideshow.js` file and add the following line to your code.
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