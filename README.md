# Fast, Responsive YouTube Embeds

**Fryte** speeds up YouTube embeds by loading only video thumbnails
initially, and lazy-loading videos on demand. There are **no** external
dependencies.

## Get Started

You can run the example with `npm start`.

Include `dist/fryte.min.js`, in your project to use **fryte**. You'll
only need the JS file; the CSS and SVG play icon are inlined.

To embed a video, find the video's YouTube id and add the following
markup to your project:

```html
<div class="fryte" data-id="YOUTUBE_ID"></div>
```

Call the following function on any page with videos to get the process
rolling:

```javascript
Fryte();
```

It's also possible to pass an object to `Fryte` to customize the
embedded video. This object is converted into query parameters on the
embed URI. See [Google's YouTube documentation][0] for all possible
parameters. Example:

```javascript
Fryte({
  fs: 0,
  controls: 2,
  loop: 1,
});
```

Embed as many videos as you like using this method.

## Modifying Fryte

You can build a customized version of **fryte** with the command `npm
run build`. Most of the code worth changing lives in `src/`. The CSS is
very minimal, and it is probably more practical to override it than
change it directly. If you'd like to change the play icon to match your
site's branding, you can replace `src/play-button.svg` with your own SVG
and rebuild the project.

[0]: https://developers.google.com/youtube/player_parameters
