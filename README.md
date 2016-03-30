# Fast, Responsive YouTube Embeds

Fryte speeds up YouTube embeds by loading only video thumbnails
initially, and lazy-loading videos on demand. The only dependency is
jQuery.

## Get Started

You can run the examples with `npm start`.

Use `npm run build` to build fryte. Include `dist/fryte.min.js`, in your
project to use fryte. You'll only need the JS file, the CSS and SVG play
icon are inlined.

To embed a video, find the video's YouTube id and add the following
markup to your project:

```
<div class="fryte" data-id="YOUTUBE_ID"></div>
```

Embed as many videos as you like using this method.
