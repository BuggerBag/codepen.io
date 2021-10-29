# codepen.io
creative pen on codepen.io that I invent it :}

<div class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="XWMWrjR" data-user="cloudi"  data-prefill='{"title":"SVG test","tags":[],"scripts":[],"stylesheets":["https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css"]}'>
  <pre data-lang="slim">section.py-5.section-bubble1
  .container
    h1 Section1
    p A test paragraph.
section.py-5.section-bubble2
  .container
    h1 Section2
    p A test paragraph.
section.py-5.section-bubble3
  .container
    h1 Section3
    p A test paragraph.
section.py-5.section-bubble4
  .container
    h1 Section4
    p A test paragraph.
section.py-5.section-bubble5
  .container
    h1 The footer
    p A test paragraph.
    br
    br
    br
    br</pre>
  <pre data-lang="scss">//https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css

//https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css



$spacer-height: 20vw;
$section1-bg-color: #ffffff;
$section2-bg-color: #FFD2B0;
$section3-bg-color: #384364;
$section4-bg-color: #cccccc;
$section5-bg-color: #333333;

@mixin bubbles($bubbles-type, $color)
{
  @if $bubbles-type == a
  {
    background-image: url("data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' fill='#{url-friendly-colour($color)}' viewBox='0 0 1185 248'>&lt;circle cx='76' cy='121.1' r='20' class='a'/>&lt;circle cx='870' cy='201.1' r='11' class='a'/>&lt;circle cx='814.5' cy='165.6' r='24.5' class='a'/>&lt;path d='M0 0v17.7c22.7 14.8 53 31.9 90.7 51.5 150.8 78 322 116.6 424.8 69.3 102.9-47.4 138-69.3 210.8-69.3s118.3 48.6 219.5 38.3 76.3-59.3 188.7-59.3c18.9 0 35.5 2.6 50.5 6.8V0H0z' class='a'/>&lt;/svg>");
  }

  @else if $bubbles-type == b
  {
    background-image: url("data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1185 248'>&lt;path d='M50.5 199.8c112.4 0 87.5-49 188.7-59.3s146.7 38.3 219.5 38.3 107.9-21.9 210.8-69.3c102.8-47.3 274-8.7 424.8 69.3 37.7 19.5 68 36.7 90.7 51.5V0H0v193C15 197.2 31.6 199.8 50.5 199.8zM1109 106.9c11 0 20 9 20 20 0 11-9 20-20 20s-20-9-20-20C1089 115.9 1098 106.9 1109 106.9zM370.5 57.9c13.5 0 24.5 11 24.5 24.5 0 13.5-11 24.5-24.5 24.5S346 95.9 346 82.4C346 68.9 357 57.9 370.5 57.9zM315 35.9c6.1 0 11 4.9 11 11s-4.9 11-11 11 -11-4.9-11-11S308.9 35.9 315 35.9z' fill='#{url-friendly-colour($color)}'/>&lt;/svg>");
  }
}

@mixin section-bubble-with-colors($bubble-type, $currentcolor, $nextcolor)
{
  @extend .section-bubble;
  background-color: $currentcolor;
  
  &:after
  {
    background-color: $nextcolor;
    
    @include bubbles($bubble-type, $currentcolor);
  }
}

@function url-friendly-colour($colour) {
    @return '%23' + str-slice('#{$colour}', 2, -1)
}

.section-bubble
{
  margin-bottom: $spacer-height;
  position: relative;
  
  &:after
  {
    content: '';
    position: absolute;
    bottom: 0;
    
    width: 100%;
    height: $spacer-height;
    background: url('') green; // needs to be next sections background
    background-size: 100%;
    
    transform: translate(0, 100%);
  }
}



.section-bubble1
{
  @include section-bubble-with-colors(a, $section1-bg-color, $section2-bg-color);
}

.section-bubble2
{
  @include section-bubble-with-colors(b, $section2-bg-color, $section3-bg-color);
}

.section-bubble3
{
  @include section-bubble-with-colors(a, $section3-bg-color, $section4-bg-color);
  
  h1
  { 
    color: white;
  }
  p
  {
    color: white;
    opacity: .8;
  }
}

.section-bubble4
{
  @include section-bubble-with-colors(b, $section4-bg-color, $section5-bg-color);
}

.section-bubble5
{
  background: $section5-bg-color;
  color: white;
  
  text-align: center;
}


//$bubbles-a: '&lt;svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1185 248">&lt;g fill="#FF8787">&lt;circle cx="76" cy="121.1" r="20"/>&lt;circle cx="870" cy="201.1" r="11"/>&lt;circle cx="814.5" cy="165.6" r="24.5"/>&lt;path d="M0 0v17.7c22.7 14.8 53 31.9 90.7 51.5 150.8 78 322 116.6 424.8 69.3 102.9-47.4 138-69.3 210.8-69.3s118.3 48.6 219.5 38.3 76.3-59.3 188.7-59.3c18.9 0 35.5 2.6 50.5 6.8V0H0z"/>&lt;/g>&lt;/svg>';
//$bubbles-b: '&lt;svg xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" version="1" viewBox="0 0 1185 248">&lt;path fill="#0012B7" d="M51 200c112 0 87-49 188-59s147 38 220 38 108-22 211-69c102-48 274-9 424 69 38 19 68 37 91 51V0H0v193c15 4 32 7 51 7zm1058-93c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zM371 58a25 25 0 1 1-1 49 25 25 0 0 1 1-49zm-56-22c6 0 11 5 11 11s-5 11-11 11-11-5-11-11 5-11 11-11z"/>&lt;/svg>';



.section-bubble_type-a
{
  @extend .section-bubble;
  
  &:after
  {
    //background-image: url('http://localhost:3000/~rinu/rinu/wp-content/themes/siebzehn/static/images/bubbles.svg');
    background-image: url("data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' fill='red' viewBox='0 0 1185 248'>&lt;circle cx='76' cy='121.1' r='20' class='a'/>&lt;circle cx='870' cy='201.1' r='11' class='a'/>&lt;circle cx='814.5' cy='165.6' r='24.5' class='a'/>&lt;path d='M0 0v17.7c22.7 14.8 53 31.9 90.7 51.5 150.8 78 322 116.6 424.8 69.3 102.9-47.4 138-69.3 210.8-69.3s118.3 48.6 219.5 38.3 76.3-59.3 188.7-59.3c18.9 0 35.5 2.6 50.5 6.8V0H0z' class='a'/>&lt;/svg>");
  }
}

.section-bubble_type-b
{
  @extend .section-bubble;
  
  &:after
  {
    background-image: url("data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1185 248'>&lt;path d='M50.5 199.8c112.4 0 87.5-49 188.7-59.3s146.7 38.3 219.5 38.3 107.9-21.9 210.8-69.3c102.8-47.3 274-8.7 424.8 69.3 37.7 19.5 68 36.7 90.7 51.5V0H0v193C15 197.2 31.6 199.8 50.5 199.8zM1109 106.9c11 0 20 9 20 20 0 11-9 20-20 20s-20-9-20-20C1089 115.9 1098 106.9 1109 106.9zM370.5 57.9c13.5 0 24.5 11 24.5 24.5 0 13.5-11 24.5-24.5 24.5S346 95.9 346 82.4C346 68.9 357 57.9 370.5 57.9zM315 35.9c6.1 0 11 4.9 11 11s-4.9 11-11 11 -11-4.9-11-11S308.9 35.9 315 35.9z' fill='red'/>&lt;/svg>");
    
    
  }
}</pre></div>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
